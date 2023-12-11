import { AssetService } from '../services/asset.service';

export class AssetController {
  private readonly assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }

  create() {
    this.assetService.create();
  }
}