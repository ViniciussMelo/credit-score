import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';

export enum UserRole {
  admin = 'admin',
  customer = 'customer'
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}