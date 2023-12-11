import { UserRole } from '../entities/user.entity';

export class UserPayloadDto {
  id: number;
  email: string;
  name: string;
}