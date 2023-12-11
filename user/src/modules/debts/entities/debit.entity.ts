import { Column } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';

export class DebitEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column()
  price: number;
}