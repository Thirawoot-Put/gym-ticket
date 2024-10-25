import 'es6-shim';
import 'reflect-metadata';

import express from 'express';

import ErrorHandler from '@/middlewares/exception';

import { NODE_ENV } from '@/config/env';

import testRoute from '@/route/testRoute'
import StatusCodes from '@/utils/statusCode';

import { CustomError } from '@/middlewares/exception'

const app = express();

app.get(`/health-check`, (_req, res) => {
  res.status(StatusCodes.OK).json({
    mode: NODE_ENV,
  });
});

app.use(`/test`, testRoute)
app.use(`/error`, (req, res, next) => {
  try {
    throw new CustomError('test error with custom error', 200)
  } catch (err) {
    next(err)
  }
})

app.use(ErrorHandler.notFound);
app.use(ErrorHandler.serverError);

export default app;
