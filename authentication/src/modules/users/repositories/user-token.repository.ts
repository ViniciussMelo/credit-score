import { Repository } from 'typeorm';

import { JWT_EXPIRES_IN_REFRESH_TOKEN } from './../../../configs/constants/index';
import { DateFormat } from './../../../shared/utils/date-format.utils';
import { AppDataSource } from './../../database/typeorm/data-source';
import { UserTokenEntity } from '../entities/user-token.entity';

export class UserTokenRepository {
  private repository: Repository<UserTokenEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokenEntity);
  }


  async getTokenByUserIdAndToken(userId: number, refreshToken: string) {
    return this.repository.findOne({
      where: {
        userId,
        refreshToken
      }
    });
  }

  async deleteByUserId(userId: number) {
    const userToken = await this.repository.findOne({
      where: {
        userId,
      }
    });

    if (!userToken) return;

    return this.repository.delete(userToken.id);
  }

  async save(userId: number, refreshToken: string) {
    return this.repository.save({
      userId,
      refreshToken,
      expiresDate: DateFormat.addDays(new Date(), parseInt(JWT_EXPIRES_IN_REFRESH_TOKEN))
    });
  }
}