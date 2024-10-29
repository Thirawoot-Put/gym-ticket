import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/interfaces/user-repository";
import { RedisDb } from "../database/redis.database";
import { Database } from "../database/interface.database";

export class redisUserRepository implements UserRepository {
  database: Database
  constructor(database: Database) {
    this.database = database
  }

  async create(user: User): Promise<User> {
    return await this.database.save(user.userName, user.password)
  }

  async findById(id: string): Promise<User> {
    return await this.database.findById(id)
  }

  async update(user: User): Promise<User> {
    return await this.database.update(user)
  }

  async delete(id: string): Promise<User> {
    return await this.database.delete(id)
  }
}
