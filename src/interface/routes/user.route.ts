//import { RedisDb } from "@/infrastructure/database/redis.database";
import { RedisUserRepository } from "@/infrastructure/repositories/user.repository";
import { UserUseCase } from "@/use-cases/user.use-case";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMongoDb } from "@/infrastructure/database/mongoDb.repository";
import { MsgConsumer } from "@/infrastructure/msg-brokers/msg-broker.repository";

const router = Router()

//const redisDb = new RedisDb()
const userMongDb = new UserMongoDb()
const userRepository = new RedisUserRepository(userMongDb)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

router
  .post('/', userController.postNewUser)
  .patch('/', userController.patchUser)
router
  .get('/:id/say-hi', userController.userSayHi)
  .get('/:id', userController.getUserById)
  .delete('/:id', userController.deleteUser)


export default router;
