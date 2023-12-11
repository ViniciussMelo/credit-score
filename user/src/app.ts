import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import 'reflect-metadata';
import cors from 'cors';

import { AppDataSource } from './modules/database/typeorm/data-source';
import { AppError } from './shared/errors/app.error';
import { router } from './shared/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

AppDataSource.initialize().then(async () => {
  const port = process.env.PORT || 3001;

  app.listen(port, () => console.log(`User is running at ${port}`));
});