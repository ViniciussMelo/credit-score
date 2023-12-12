import { Score } from '@prisma/client';

import { CreateScoreDto } from '../dtos/create-score.dto';
import { prisma } from '../../database/prisma/client';

export class ScoreRepository {
  async findOneByUserId(userId: number): Promise<Score | null> {
    return prisma.score.findFirst({
      where: {
        userId
      }
    });
  }

  async create({ email, name, userId, score, items }: CreateScoreDto): Promise<Score> {
    return prisma.score.create({
      data: {
        email,
        name,
        userId,
        score,
        items
      }
    });
  }

  async save({ email, items, name, score, userId, id }: Score) {
    return prisma.score.update({
      where: {
        id,
      },
      data: {
        email,
        items,
        name,
        score,
        userId
      },
    });
  }
}