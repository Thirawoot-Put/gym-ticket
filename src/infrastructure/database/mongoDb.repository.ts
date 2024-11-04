import UserModel from "@/shared/models/user";
import { Database } from "@/infrastructure/database/interface";
import { User } from "@/domain/entities/user.entity";
import { nanoid } from "nanoid";

export class UserMongoDb implements Database {
  async save(userName: string, password: string): Promise<User> {
    const newUser = new UserModel({ id: nanoid(), userName, password, _isActive: false })

    return await newUser.save()
  }
}
