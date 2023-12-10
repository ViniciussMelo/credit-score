module.exports = {
  type: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  logging: Boolean(process.env.DATABASE_LOGGING),
  entities: ['./src/modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
};