import { nanoid } from "nanoid";

import { User } from "@/domain/entities/user.entity";
import redis from "@/shared/utils/redis";
import { Database } from "@/infrastructure/database/interface";

export class RedisDb implements Database {
  async save(userName: string, password: string) {
    const user = new User(nanoid(), userName, password)
    await redis.setnx(`user:${user.id}`, JSON.stringify(user))

    return await this.findById(user.id)
  }

  async delete(id: string) {
    console.log(id)
    let foundUser = await this.findById(id)
    foundUser._isActive = false

    await redis.set(`user:${foundUser.id}`, JSON.stringify(foundUser))

    return foundUser
  }

  async findById(id: string) {
    const foundUserString = await redis.get(`user:${id}`)
    if (!foundUserString) throw new Error('USER_NOT_FOUND')

    return JSON.parse(foundUserString) as User
  }

  async update(user: User) {
    await redis.set(`user:${user.id}`, JSON.stringify(user))

    return await this.findById(user.id)
  }
}
