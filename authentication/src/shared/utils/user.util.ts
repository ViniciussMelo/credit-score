import { UserRole } from '../../modules/users/entities/user.entity';

export class UserUtil {
  static isAdmin(role: UserRole): boolean {
    return role === UserRole.admin;
  }
}