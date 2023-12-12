import { UserEntity, UserRole } from '../../../src/modules/users/entities/user.entity';

export const userMock: UserEntity[] = [
  {
    id: 1,
    name: 'customer mock',
    email: 'customer@email.com',
    password: 'password',
    role: UserRole.customer,
    createdAt: new Date(),
  },
  {
    id: 1,
    name: 'admin mock',
    email: 'admin@email.com',
    password: 'password',
    role: UserRole.admin,
    createdAt: new Date(),
  }
]