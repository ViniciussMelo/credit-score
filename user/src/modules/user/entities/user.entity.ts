import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum UserRole {
  admin = 'admin',
  customer = 'customer'
}

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: UserRole;
}