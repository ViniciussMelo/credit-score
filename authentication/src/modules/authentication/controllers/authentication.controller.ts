import { Request, Response } from "express";

import { AuthenticationService } from '../services/authentication.service';

export class AuthenticationController {
  private readonly authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async getRefreshToken(request: Request, response: Response) {
    const { refreshToken: oldRefreshToken } = request.body;

    const { accessToken, refreshToken } = await this.authenticationService.getNewToken(oldRefreshToken);

    return response.status(200).json({ accessToken, refreshToken });
  }
}