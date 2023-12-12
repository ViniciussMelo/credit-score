import { UserPayloadDto } from 'modules/user/dtos/user-payload.dto';
import { AssetRepository } from '../repositories/asset.repository';
import { UserService } from '../../user/services/user.service';
import { AppError } from '../../../shared/errors/app.error';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import { UpdateAssetDto } from '../dtos/update-asset.dto';
import { ScoreService } from '../../score/score.service';
import { AssetEntity } from '../entities/asset.entity';

export class AssetService {
  private readonly scoreService: ScoreService;
  private readonly userService: UserService;

  private readonly assetRepository: AssetRepository;

  constructor() {
    this.assetRepository = new AssetRepository();

    this.scoreService = new ScoreService();
    this.userService = new UserService();
  }

  async create({ email, id: userId, name }: UserPayloadDto, data: CreateAssetDto, token: string): Promise<void> {
    const alreadyExistsAsset = await this.assetRepository.findByTypeAndUserId(userId, data.type);

    if (alreadyExistsAsset) {
      throw new AppError('Already exists asset with same type', 409);
    }

    if (data.price <= 0) {
      throw new AppError('Invalid price', 400);
    }

    await this.userService.create({
      id: userId,
      name,
      email
    });

    const asset = await this.assetRepository.create(userId, data);

    await this.scoreService.updateAsset(asset, token);
  }

  async getAll(userId: number): Promise<AssetEntity[]> {
    return this.assetRepository.findAllByUserId(userId);
  }

  async getById(id: number, userId: number) {
    const asset = await this.assetRepository.findByIdAndUserId(id, userId);

    if (!asset) {
      throw new AppError('Not found', 404);
    }

    return asset;
  }

  async update(id: number, userId: number, data: UpdateAssetDto, token: string): Promise<void> {
    const asset = await this.assetRepository.findByIdAndUserId(id, userId);

    if (!asset) {
      throw new AppError('Not found', 404);
    }

    await this.assetRepository.update(id, data);
    const updatedAsset = await this.assetRepository.findByIdAndUserId(id, userId);

    await this.scoreService.updateAsset(updatedAsset!, token);
  }

  async delete(id: number, userId: number, token: string): Promise<void> {
    const asset = await this.assetRepository.findByIdAndUserId(id, userId);

    if (!asset) {
      throw new AppError('Not found', 404);
    }

    await this.assetRepository.deleteById(id);
    await this.scoreService.deleteItem(id, userId, token);
  }
}