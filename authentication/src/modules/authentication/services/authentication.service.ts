import { sign, verify } from "jsonwebtoken";

import {
  JWT_SECRET_TOKEN,
  JWT_EXPIRES_IN_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRES_IN_REFRESH_TOKEN
} from '../../../configs/constants';
import { UserTokenRepository } from './../../users/repositories/user-token.repository';
import { UserRepository } from './../../users/repositories/user.repository';
import { DateFormat } from './../../../shared/utils/date-format.utils';
import { SignInResponseDto } from '../dtos/sign-in-response.dto';
import { AppError } from './../../../shared/errors/app.error';
import { UserUtil } from '../../../shared/utils/user.util';
import { IPayload } from '../interfaces/auth.interface';
import { SignInDto } from '../dtos/sign-in.dto';


export class AuthenticationService {
  private readonly userTokenRepository: UserTokenRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.userTokenRepository = new UserTokenRepository();
    this.userRepository = new UserRepository();
  }

  async signIn(data: SignInDto): Promise<SignInResponseDto> {
    const accessToken = this.generateAccessToken(data);
    const refreshToken = this.generateRefreshToken(data);

    await this.saveToken(data.id, refreshToken);

    return {
      accessToken,
      refreshToken
    }
  }

  async getNewToken(refreshToken: string): Promise<SignInResponseDto> {
    try {
      const { sub } = this.checkRefreshToken(refreshToken);
      const userId = parseInt(sub);

      const userToken = await this.userTokenRepository.getTokenByUserIdAndToken(userId, refreshToken);

      if (!userToken) {
        throw new AppError('Unauthorized', 401);
      }

      if (DateFormat.isExpired(userToken.expiresDate)) {
        throw new AppError('Refresh token has expired', 403);
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new AppError('Unauthorized', 401);
      }

      return this.signIn({
        ...user,
        isAdmin: UserUtil.isAdmin(user.role)
      });

    } catch (err: any) {

      if (err instanceof AppError) throw err;

      throw new AppError('Unauthorized', 401);
    }
  }

  private async saveToken(userId: number, refreshToken: string) {
    await this.userTokenRepository.deleteByUserId(userId);
    await this.userTokenRepository.save(userId, refreshToken);
  }

  private checkRefreshToken(token: string) {
    const { sub, email } = verify(token, JWT_SECRET_REFRESH_TOKEN) as IPayload;

    return { sub, email };
  }

  private generateAccessToken({ id, name, email, isAdmin }: SignInDto): string {
    return sign({ name, email, isAdmin }, JWT_SECRET_TOKEN, {
      subject: `${id}`,
      expiresIn: JWT_EXPIRES_IN_TOKEN,
    });
  }

  private generateRefreshToken({ id, name, email }: SignInDto): string {
    return sign({ name, email }, JWT_SECRET_REFRESH_TOKEN, {
      subject: `${id}`,
      expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
    });
  }
}