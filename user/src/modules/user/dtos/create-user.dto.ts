import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  id: number;
  name: string;
  email: string;
}