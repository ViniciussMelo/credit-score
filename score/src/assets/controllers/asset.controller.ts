import { AssetService } from '../services/asset.service';

export class AssetController {
  private readonly assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }

  async updateUserAsset(request: Request, response: Response): Promise<Response> {
    await this.assetService.updateUserAsset();
  }
}