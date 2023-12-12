import { UserEntity, UserRole } from '../../../src/modules/users/entities/user.entity';
import { userMock } from './user.mock';

export class UserFluentAPI {
  private readonly data: UserEntity[];

  constructor() {
    this.data = userMock;
  }

  getCustomer() {
    this.data.filter((user) => user.role === UserRole.customer);

    return this;
  }

  getAdmin() {
    this.data.filter((user) => user.role === UserRole.admin);

    return this;
  }

  buildUser() {
    return this.data;
  }
}