import { sign, verify } from "jsonwebtoken";

import {
  JWT_SECRET_TOKEN,
  JWT_EXPIRES_IN_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_EXPIRES_IN_REFRESH_TOKEN
} from '../../../configs/constants';
import { SignInResponseDto } from '../dtos/signin-response.dto';
import { SignInDto } from '../dtos/sigin.dto';

interface IPayload {
  sub: string;
  email: string;
}

export class AuthenticationService {
  signIn(data: SignInDto): SignInResponseDto {
    return {
      accessToken: this.generateAccessToken(data),
      refreshToken: this.generateRefreshToken(data)
    };
  }

  check(token: string) {
    const { sub, email } = verify(token, JWT_SECRET_REFRESH_TOKEN) as IPayload;

    return { sub, email };
  }

  private generateAccessToken({ id, name, email }: SignInDto): string {
    return sign({ name, email }, JWT_SECRET_TOKEN, {
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