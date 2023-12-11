import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  console.log('🚀 ~ request.user:', request.user)
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError("Forbidden", 403);
  }

  next();
}