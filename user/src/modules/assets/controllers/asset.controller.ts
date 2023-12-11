import { Request, Response } from 'express';

import { AssetService } from '../services/asset.service';

export class AssetController {
  private readonly assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    await this.assetService.create(request.user, request.body);

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    await this.assetService.update(+id, request.user.id, request.body);

    return response.status(200).send();
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const data = await this.assetService.getById(+id, request.user.id);

    return response.status(200).json({ data });
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const data = await this.assetService.getAll(request.user.id)

    return response.status(200).json({ data });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    await this.assetService.delete(+id, request.user.id);

    return response.status(200).send();
  }
}