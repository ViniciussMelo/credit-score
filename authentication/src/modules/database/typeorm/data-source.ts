import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { UserEntity1702247455662, UserTokenEntity1702248847758 } from './migrations'
import { UserTokenEntity } from '../../users/entities/user-token.entity';
import { UserEntity } from '../../users/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_DIALECT as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  logging: Boolean(process.env.DATABASE_LOGGING),
  entities: [UserEntity, UserTokenEntity],
  migrations: [UserEntity1702247455662, UserTokenEntity1702248847758],
  subscribers: [],
});