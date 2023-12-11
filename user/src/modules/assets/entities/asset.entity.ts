import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base.entity';

export enum AssetType {
  real_estate = 'real_estate',
  vehicles = 'vehicles',
}

@Entity('assets')
export class AssetEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  quantity: number;

  @Column()
  type: AssetType;

  @Column()
  price: number;
}