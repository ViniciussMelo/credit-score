import { UserPayloadDto } from 'modules/user/dtos/user-payload.dto';
import { AssetRepository } from '../repositories/asset.repository';
import { UserService } from '../../user/services/user.service';
import { AppError } from '../../../shared/errors/app.error';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import { UpdateAssetDto } from '../dtos/update-asset.dto';
import { AssetEntity } from '../entities/asset.entity';

export class AssetService {
  private readonly userService: UserService;

  private readonly assetRepository: AssetRepository;

  constructor() {
    this.assetRepository = new AssetRepository();
    this.userService = new UserService();
  }

  async create({ email, id: userId, name }: UserPayloadDto, data: CreateAssetDto): Promise<void> {
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

    await this.assetRepository.create(userId, data);
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

  async update(id: number, userId: number, data: UpdateAssetDto): Promise<void> {
    const asset = await this.assetRepository.findByIdAndUserId(id, userId);

    if (!asset) {
      throw new AppError('Not found', 404);
    }

    return this.assetRepository.update(id, data);
  }

  async delete(id: number, userId: number): Promise<void> {
    const asset = await this.assetRepository.findByIdAndUserId(id, userId);

    if (!asset) {
      throw new AppError('Not found', 404);
    }

    await this.assetRepository.deleteById(id);
  }
}