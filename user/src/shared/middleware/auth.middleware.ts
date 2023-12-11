import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { IPayload } from '../../shared/interfaces/auth.interface';
import { JWT_SECRET_TOKEN } from '../../configs/constants';
import { AppError } from '../errors/app.error';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id, email, name, isAdmin } = verify(token, JWT_SECRET_TOKEN) as IPayload;

    request.user = {
      id: +user_id,
      email,
      name,
      isAdmin
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}