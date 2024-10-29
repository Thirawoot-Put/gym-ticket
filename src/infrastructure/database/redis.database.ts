import { User } from "@/domain/entities/user.entity";
import redis from "@/shared/utils/redis";
import { nanoid } from "nanoid";

export class redisDb {
  // save
  async save(userName: string, password: string) {
    const user = new User(nanoid(), userName, password)
    await redis.setnx(`user:${user.id}`, JSON.stringify(user))

    return user
  }

  // delete
  async delete(id: string) {
    let foundUser = await this.findById(`user:${id}`)
    foundUser._isActive = false

    return foundUser
  }

  // get
  async findById(id: string) {
    const foundUserString = await redis.get(`user:${id}`)
    if (!foundUserString) throw new Error('USER_NOT_FOUND')

    return JSON.parse(foundUserString) as User
  }

  // update
  async update(user: User) {
    await redis.set(`user:${user.id}`, JSON.stringify(user))

    return await this.findById(`user:${user.id}`)
  }
}
