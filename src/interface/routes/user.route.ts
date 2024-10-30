import { RedisDb } from "@/infrastructure/database/redis.database";
import { RedisUserRepository } from "@/infrastructure/repositories/user.repository";
import { UserUseCase } from "@/use-cases/user.use-case";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router()

const redisDb = new RedisDb()
const userRepository = new RedisUserRepository(redisDb)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

router
  .post('/', userController.postNewUser.bind(userController))
  .patch('/', userController.patchUser.bind(userController))
router
  .get('/:id', userController.getUserById.bind(userController))
  .delete('/:id', userController.deleteUser.bind(userController))

export default router;
