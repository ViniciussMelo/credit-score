import axios, { Method } from 'axios';

import { UserPayloadDto } from '../user/dtos/user-payload.dto';
import { AssetEntity } from '../assets/entities/asset.entity';
import { DebtEntity } from '../debts/entities/debt.entity';

export class ScoreService {
  private readonly baseUrl = process.env.SCORE_API_URL;

  async updateAsset(body: AssetEntity, token: string): Promise<void> {
    return this.makeRequest<AssetEntity>(`${this.baseUrl}/score/updateAssets`, 'POST', token, body);
  }

  async updateDebt(body: DebtEntity, user: UserPayloadDto, token: string): Promise<void> {
    return this.makeRequest(`${this.baseUrl}/score/updateDebts`, 'POST', token, { ...body, user });
  }

  async deleteItem(id: number, userId: number, token: string) {
    return this.makeRequest(`${this.baseUrl}/score/delete/${id}`, 'DELETE', token, { userId });
  }

  private async makeRequest<T>(url: string, method: Method, token: string, body: T): Promise<void> {
    await axios({
      url,
      data: { ...body },
      method,
      headers: {
        'Authorization': token
      }
    });
  }
}