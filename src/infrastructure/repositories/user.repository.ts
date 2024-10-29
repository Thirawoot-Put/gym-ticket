import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/interfaces/user-repository";
import { Database } from "../database/interface.database";
import { UserCreate } from "@/shared/dto/user.dto";

export class redisUserRepository implements UserRepository {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async create(user: UserCreate): Promise<User> {
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
