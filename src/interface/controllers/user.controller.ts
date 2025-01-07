import { NextFunction, Request, Response } from "express";

import { UserUseCase } from "@/use-cases/user.use-case";
import bindAll from "@/shared/utils/bindInstance";

export class UserController {
  constructor(private userUseCase: UserUseCase) {
    bindAll(this)
  }

  async postNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.createNewUser(req.body)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.findUserById(req.params.id)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async patchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.updateUser(req.body)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.deleteUser(req.params.id)
      res.send(user)
    } catch (e: any) {
      next(e)
    }
  }

  async userSayHi(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userUseCase.userSendMsg(req.params.id)
      res.send('Message has heen sended')
    } catch (e) {
      next(e)
    }
  }
}
