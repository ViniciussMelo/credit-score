import { Repository } from 'typeorm';

import { AppDataSource } from './../../database/typeorm/data-source';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import { AssetEntity, AssetType } from '../entities/asset.entity';
import { UserEntity } from 'modules/user/entities/user.entity';
import { UpdateAssetDto } from '../dtos/update-asset.dto';

export class AssetRepository {
  private readonly repository: Repository<AssetEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(AssetEntity);
  }

  async create(userId: number, data: CreateAssetDto): Promise<AssetEntity> {
    const asset = this.repository.create({ userId, ...data });

    return this.repository.save(asset);
  }

  async findByTypeAndUserId(userId: number, type: AssetType): Promise<AssetEntity | null> {
    return this.repository.findOne({
      where: {
        userId,
        type
      }
    });
  }

  async findAllByUserId(userId: number): Promise<AssetEntity[]> {
    return this.repository.find({
      where: {
        userId
      }
    });
  }

  async findByIdAndUserId(id: number, userId: number): Promise<AssetEntity | null> {
    return this.repository.findOne({
      where: {
        userId,
        id
      }
    });
  }

  async deleteByIdAndUSerId(id: number, userId: number) {
    const asset = await this.findByIdAndUserId(id, userId);

    if (!asset) return;

    await this.repository.softDelete(asset.id);
  }

  async update(id: number, data: UpdateAssetDto): Promise<void> {
    await this.repository.update(id, data);
  }
}