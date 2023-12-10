import dotenv from "dotenv";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

dotenv.config();

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const isTest = process.env.NODE_ENV === "test";

  return createConnection(
    Object.assign(defaultOptions, {
      database: isTest ? process.env.DATABASE_NAME_TEST : defaultOptions.database,
    })
  );
};