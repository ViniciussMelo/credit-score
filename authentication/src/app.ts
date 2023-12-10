import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import createConnection from './shared/typeorm/connection';
import { router } from './shared/routes';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

export { app };