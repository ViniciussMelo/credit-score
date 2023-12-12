import { ScoreService } from '../services/score.service';

export class ScoreController {
  private readonly scoreService: ScoreService;

  constructor() {
    this.scoreService = new ScoreService();
  }

  updateUserDebt() {

  }

  updateUserAsset() {

  }
}