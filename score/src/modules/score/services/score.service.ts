import { ItemType, Score } from '@prisma/client';

import { CreateAssetItemDto, CreateItemDto } from '../dtos/create-score.dto';
import { ScoreRepository } from '../repositories/score.repository';
import { GetScoreResponse } from '../dtos/get-score-response.dto';
import { AppError } from '../../../shared/errors/app.error';
import { UserDto } from '../../../shared/dtos/user.dto';

export class ScoreService {
  private readonly scoreRepository: ScoreRepository;

  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  async getUserScore(userId: number): Promise<GetScoreResponse> {
    const score = await this.scoreRepository.findOneByUserId(userId);

    if (!score) {
      throw new AppError('Not found', 404);
    }

    return GetScoreResponse.factory(score);
  }

  async deleteUserItem(userId: number, id: number) {
    const userScore = await this.scoreRepository.findOneByUserId(userId);

    if (!userScore) {
      throw new AppError('Not found', 404);
    }

    const itemIndex = userScore.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      throw new AppError('Not found', 404);
    }

    userScore.items.splice(itemIndex, 1);

    await this.generateScore(userScore);
  }

  async updateUserAsset(id: number, user: UserDto, { price, quantity, type }: CreateAssetItemDto): Promise<void> {
    return this.updateItem(
      id,
      user,
      {
        id,
        name: type,
        price,
        quantity,
        type: 'ASSET'
      }
    )
  }

  async updateUserDebt(id: number, user: UserDto, item: CreateItemDto,): Promise<void> {
    return this.updateItem(
      id,
      user,
      { ...item, type: 'DEBT', quantity: 1 }
    );
  }

  private async updateItem(id: number, user: UserDto, { name, price, quantity, type }: CreateItemDto,): Promise<void> {
    let userScore = await this.scoreRepository.findOneByUserId(user.userId);

    if (!userScore) {
      userScore = await this.createScore(user);
    }

    const item = userScore.items.findIndex((item) => item.id === id && item.type === type);

    if (item === -1) {
      userScore.items.push({
        id,
        name,
        price,
        quantity,
        type
      });
    } else {
      userScore.items[item] = {
        id,
        name,
        price,
        quantity,
        type
      }
    }

    await this.generateScore(userScore);
  }

  private async generateScore(score: Score): Promise<void> {
    const items: Array<{ type: ItemType, count: number, amount: number }> = [
      {
        type: 'DEBT',
        amount: 0,
        count: 0
      },
      {
        type: 'ASSET',
        amount: 0,
        count: 0
      }
    ]

    score.items.forEach((item) => {
      const findIndex = items.findIndex((i) => i.type === item.type);

      items[findIndex] = {
        type: items[findIndex].type,
        count: items[findIndex].count + item.quantity,
        amount: items[findIndex].amount + item.price,
      }
    });

    const [debts] = items.filter((item) => item.type === 'DEBT');
    const [assets] = items.filter((item) => item.type === 'ASSET');

    const scoreAssets = (assets.amount * assets.count) / 2;

    const scoreDebts = (debts.amount * (debts.count * 100)) / 2;

    const scoreFinal = Math.min((scoreAssets - scoreDebts), 1000);

    const updatedScore = Math.max(Math.round(scoreFinal), 100);

    await this.scoreRepository.save(
      {
        ...score,
        score: updatedScore,
      }
    )
  }

  private async createScore(user: UserDto) {
    return this.scoreRepository.create({
      ...user,
      score: 0
    });
  }
}