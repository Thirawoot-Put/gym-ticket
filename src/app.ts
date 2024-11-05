import 'es6-shim';
import 'reflect-metadata';

import express from 'express';
import logger from 'morgan';

import userRouter from '@/interface/routes/user.route'

import ExceptionHandler from '@/shared/middlewares/exception';

import { LOG_LEVEL, NODE_ENV } from '@/shared/config/env';

import StatusCodes from '@/shared/utils/statusCode';
import MongoDb from './shared/utils/mongoDb';


const app = express();

app.use(express.json());

app.use(logger(LOG_LEVEL));

async function startServer() {
  try {
    await MongoDb.connect()

    app.get(`/health-check`, (_req, res) => {
      res.status(StatusCodes.OK).json({
        mode: NODE_ENV,
      });
    });

    app.use('/user', userRouter)

    app.use(ExceptionHandler.notFound);
    app.use(ExceptionHandler.serverError);
  } catch (e) {
    console.error(e)
  }
}

startServer()

export default app;
