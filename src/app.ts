import 'es6-shim';
import 'reflect-metadata';

import express from 'express';

import errorHandler from './middlewares/error';

import { NODE_ENV } from '@/config/env';

import notFound from './middlewares/notFound';

import StatusCodes from './utils/statusCode';

const app = express();

app.get(`/health-check`, (_req, res) => {
  res.status(StatusCodes.OK).json({
    mode: NODE_ENV,
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
