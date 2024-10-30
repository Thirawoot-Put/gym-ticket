import 'es6-shim';
import 'reflect-metadata';

import express from 'express';

import userRouter from '@/interface/routes/user.route'

import ExceptionHandler from '@/shared/middlewares/exception';

import { NODE_ENV } from '@/shared/config/env';

import StatusCodes from '@/shared/utils/statusCode';

const app = express();

app.use(express.json());

app.get(`/health-check`, (_req, res) => {
  res.status(StatusCodes.OK).json({
    mode: NODE_ENV,
  });
});

app.use('/user', userRouter)

app.use(ExceptionHandler.notFound);
app.use(ExceptionHandler.serverError);

export default app;
