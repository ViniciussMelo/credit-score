import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { AssetEntity1702306648758 } from './migrations/1702306648758-AssetEntity';
import { DebtEntity1702306664168 } from './migrations/1702306664168-DebtEntity';
import { UserEntity1702304979264 } from './migrations/1702304979264-UserEntity';
import { AssetEntity } from '../../assets/entities/asset.entity';
import { DebtEntity } from '../../debts/entities/debt.entity';
import { UserEntity } from '../../user/entities/user.entity';


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
  entities: [UserEntity, AssetEntity, DebtEntity],
  migrations: [UserEntity1702304979264, AssetEntity1702306648758, DebtEntity1702306664168],
  subscribers: [],
});