import { User } from "@/domain/entities/user.entity";

export interface Database {
  save(userName: string, password: string): Promise<User>
  delete(id: string): Promise<User>
  findById(id: string): Promise<User>
  update(user: User): Promise<User>
}
