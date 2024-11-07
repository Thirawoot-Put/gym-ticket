import 'es6-shim';
import 'reflect-metadata';

import express from 'express';
import logger from 'morgan';

import userRouter from '@/interface/routes/user.route'

import ExceptionHandler from '@/shared/middlewares/exception';

import { LOG_LEVEL, NODE_ENV, TOPIC_USER_SAY_HI, TOPIC_USER_SAY_HI_2 } from '@/shared/config/env';

import StatusCodes from '@/shared/utils/statusCode';
import MongoDb from './shared/utils/mongoDb';
import { MsgConsumer } from './infrastructure/msg-brokers/msg-broker.repository';


const app = express();

app.use(express.json());

app.use(logger(LOG_LEVEL));

async function startServer() {
  try {
    await MongoDb.connect()

    //const producer = new MsgProducer()
    //await producer.connect()

    const consumer = new MsgConsumer()
    await consumer.connect()

    app.get(`/health-check`, (_req, res) => {
      res.status(StatusCodes.OK).json({
        mode: NODE_ENV,
      });
    });

    app.use('/user', userRouter)

    app.use(ExceptionHandler.notFound);
    app.use(ExceptionHandler.serverError);

    await consumer.subscribe(TOPIC_USER_SAY_HI, TOPIC_USER_SAY_HI_2)
    await consumer.consumeMsg((msgValue) => {
      //throw new Error('test kafka message error')
      console.log(JSON.parse(msgValue))
    })

  } catch (e) {
    console.error(e)
  }
}

startServer()

export default app;
