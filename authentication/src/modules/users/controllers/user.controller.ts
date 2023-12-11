import { Request, Response } from "express";
import { UserService } from '../services/user.service';

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService()
  }

  async register(request: Request, response: Response): Promise<Response> {
    await this.userService.create(request.body);

    return response.status(200).send();
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { accessToken, refreshToken } = await this.userService.login(request.body);

    return response.status(200).json({ accessToken, refreshToken });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;

    await this.userService.delete(authorization!);

    return response.status(200).send();
  }
}