import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';
import { UserTokenEntity } from './user-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserTokenEntity, userToken => userToken.user)
  @JoinColumn()
  userToken: UserTokenEntity;
}