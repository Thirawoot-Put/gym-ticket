import { UserCreate } from "@/shared/dto/user.dto";
import { User } from "../entities/user.entity";

export interface UserRepository {
  create(user: UserCreate): Promise<User>;
  findById(id: string): Promise<User>;
  update(user: Partial<User>): Promise<User>
  delete(id: string): Promise<User>
}
