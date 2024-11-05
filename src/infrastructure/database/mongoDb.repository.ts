import { Database } from "@/infrastructure/database/interface";
import { User } from "@/domain/entities/user.entity";
import { nanoid } from "nanoid";
import MongoDb from "@/shared/utils/mongoDb";
import { CustomError } from "@/shared/middlewares/exception";
import StatusCodes from "@/shared/utils/statusCode";

interface IUser {
  id: string
  userName: string
  password: string
  _isActive: boolean
}

const userColl = MongoDb.getCollection("user")

export class UserMongoDb implements Database {
  async save(userName: string, password: string): Promise<User> {
    const id = nanoid()
    const userDoc: IUser = { id, userName, password, _isActive: true }
    await userColl.insertOne(userDoc)

    return await this.findById(id)
  }

  async findById(id: string): Promise<User> {
    const user = await userColl.findOne({ id: id })
    if (!user) throw new CustomError("USER_NOT_FOUND", StatusCodes.NOT_FOUND)

    return {
      id: user.id,
      userName: user.userName,
      password: user.password,
      _isActive: user._isActive
    }
  }

  async update(user: User): Promise<User> {
    await this.findById(user.id)

    await userColl.updateOne({ id: user.id }, {
      $set: {
        'password': user.password,
        '_isActive': user._isActive
      }
    })

    return await this.findById(user.id)
  }

  async delete(id: string): Promise<User> {
    const foundUser = await this.findById(id)

    foundUser._isActive = false

    return await this.update(foundUser)
  }
}