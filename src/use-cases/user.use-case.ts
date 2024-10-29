import { UserRepository } from "@/domain/interfaces/user-repository";
import { UserCreate, UserResponse, UserUpdate } from "@/shared/dto/user.dto";
import Mapper from "@/shared/utils/modelMapper";

const mapper = new Mapper()

class validateUser {
  static validateUserData(user: UserCreate) {
    if (!user) throw new Error('User data is required')
    if (!user.userName) throw new Error('Username data is required')
    if (!user.password) throw new Error('Password data is required')
  }

  static validateUserId(id: string) {
    if (id === '') throw new Error('ID_NOT_PROVIDE')
  }
}

export class UserUseCase {
  private userRepository: UserRepository

  constructor(repository: UserRepository) {
    this.userRepository = repository
  }

  async createNewUser(user: UserCreate) {
    validateUser.validateUserData(user)
    const mapUser = mapper.toInstance(UserCreate, user)
    let newUser = await this.userRepository.create(mapUser)

    return mapper.toInstance(UserResponse, newUser)
  }

  async findUserById(id: string) {
    validateUser.validateUserId(id)
    return await this.userRepository.findById(id)
  }

  async updateUser(user: UserUpdate) {
    const mapUser = mapper.toInstance(UserUpdate, user)
    if (!mapUser.password) throw new Error('UPDATE_DATA_IS_REQUIRED')
    const updatedUser = await this.userRepository.update(user)

    return mapper.toInstance(UserResponse, updatedUser)
  }

  async deleteUser(id: string) {
    validateUser.validateUserId(id)
    const deletedUser = await this.userRepository.delete(id)

    return mapper.toInstance(UserResponse, deletedUser)
  }
}
