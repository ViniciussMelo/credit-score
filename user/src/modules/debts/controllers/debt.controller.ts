import { Request, Response } from 'express';

import { DebtService } from '../services/debt.service';

export class DebtController {
  private readonly debtService: DebtService

  constructor() {
    this.debtService = new DebtService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    await this.debtService.create(request.body, request.headers.authorization || '');

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.debtService.update(+id, request.body, request.headers.authorization || '');

    return response.status(200).send();
  }

  async getByUserId(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const data = await this.debtService.getByUserId(+id);

    return response.status(200).json({ data });
  }

  async deleteById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.debtService.deleteById(+id, request.headers.authorization || '');

    return response.status(200).send();
  }
}