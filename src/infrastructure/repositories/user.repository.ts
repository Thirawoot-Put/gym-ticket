import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/interfaces/user-repository";

export class redisUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return user
  }

  async findById(id: string): Promise<User> {
    return
  }

  async update(user: User): Promise<User> {
    return user
  }

  async delete(id: string): Promise<User> {
    return
  }
}
