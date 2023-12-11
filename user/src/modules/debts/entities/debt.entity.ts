import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';

@Entity('debts')
export class DebtEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column()
  price: number;
}