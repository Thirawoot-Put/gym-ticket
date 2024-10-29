import { User } from "@/domain/entities/user.entity";
import redis from "@/shared/utils/redis";
import { nanoid } from "nanoid";
import { Database } from "./interface.database";

export class RedisDb implements Database {
  async save(userName: string, password: string) {
    const user = new User(nanoid(), userName, password)
    await redis.setnx(`user:${user.id}`, JSON.stringify(user))

    return user
  }

  async delete(id: string) {
    let foundUser = await this.findById(`user:${id}`)
    foundUser._isActive = false

    return foundUser
  }

  async findById(id: string) {
    const foundUserString = await redis.get(`user:${id}`)
    if (!foundUserString) throw new Error('USER_NOT_FOUND')

    return JSON.parse(foundUserString) as User
  }

  async update(user: User) {
    await redis.set(`user:${user.id}`, JSON.stringify(user))

    return await this.findById(`user:${user.id}`)
  }
}
