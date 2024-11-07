import { NextFunction, Request, Response } from "express";

import { UserUseCase } from "@/use-cases/user.use-case";

export class UserController {
  useCase: UserUseCase

  constructor(userUseCase: UserUseCase) {
    this.useCase = userUseCase
  }

  async postNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.useCase.createNewUser(req.body)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.useCase.findUserById(req.params.id)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async patchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.useCase.updateUser(req.body)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.useCase.deleteUser(req.params.id)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async userSayHi(req: Request, res: Response, next: NextFunction) {
    try {
      await this.useCase.userSendMsg(req.params.id)
      res.send('Message has heen sended')
    } catch (e) {
      next(e)
    }
  }
}
