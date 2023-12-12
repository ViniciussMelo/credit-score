import { Request, Response } from "express";

import { ScoreService } from '../services/score.service';

export class ScoreController {
  private readonly scoreService: ScoreService;

  constructor() {
    this.scoreService = new ScoreService();
  }

  async getUserScore(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const score = await this.scoreService.getUserScore(+id);

    return response.status(200).json({ score });
  }

  async deleteUserItem(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId } = request.body;

    await this.scoreService.deleteUserItem(userId, +id);

    return response.status(200).send();
  }

  async updateUserDebt(request: Request, response: Response): Promise<Response> {
    const { id, user, ...score } = request.body;

    await this.scoreService.updateUserDebt(
      +id,
      user,
      score
    );

    return response.status(200).send();
  }

  async updateUserAsset(request: Request, response: Response): Promise<Response> {
    const { id, ...score } = request.body;

    await this.scoreService.updateUserAsset(
      +id,
      { ...request.user, userId: request.user.id },
      score
    );

    return response.status(200).send();
  }
}