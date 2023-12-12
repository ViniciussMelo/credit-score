import { Score } from '@prisma/client';

export class GetScoreResponse {
  name: string;
  email: string;
  userId: number;
  score: number;

  static factory({ name, email, userId, score }: Score): GetScoreResponse {
    return {
      name,
      email,
      userId,
      score
    }
  }
}