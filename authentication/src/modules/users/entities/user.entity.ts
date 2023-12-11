import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { UserTokenEntity } from './user-token.entity';

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