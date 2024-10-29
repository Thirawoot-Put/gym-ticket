import 'es6-shim';
import 'reflect-metadata';

import express from 'express';

import ExceptionHandler from '@/middlewares/exception';

import { NODE_ENV } from '@/config/env';

import StatusCodes from '@/utils/statusCode';

const app = express();

app.get(`/health-check`, (_req, res) => {
  res.status(StatusCodes.OK).json({
    mode: NODE_ENV,
  });
});

app.use(ExceptionHandler.notFound);
app.use(ExceptionHandler.serverError);

export default app;
