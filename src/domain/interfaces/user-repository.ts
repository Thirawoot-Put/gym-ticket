import { User } from "../entities/user.entity";

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: User): Promise<User>
  delete(id: string): Promise<User>
}
