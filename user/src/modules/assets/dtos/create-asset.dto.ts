import { AssetType } from '../entities/asset.entity';

export class CreateAssetDto {
  quantity: number;
  price: number;
  type: AssetType;
}