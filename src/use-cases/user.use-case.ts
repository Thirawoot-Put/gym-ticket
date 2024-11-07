import { UserRepository } from "@/domain/interfaces/user-repository";
import { MsgProducer } from "@/infrastructure/msg-brokers/msg-broker.repository";
import { TOPIC_USER_SAY_HI } from "@/shared/config/env";
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
    const mapUser = mapper.mapObjToCls(UserCreate, user)
    let newUser = await this.userRepository.create(mapUser)

    return mapper.mapObjToCls(UserResponse, newUser)
  }

  async findUserById(id: string) {
    validateUser.validateUserId(id)
    const foundUser = await this.userRepository.findById(id)

    return mapper.mapObjToCls(UserResponse, foundUser)
  }

  async updateUser(user: UserUpdate) {
    if (!user.password) throw new Error('UPDATE_DATA_IS_REQUIRED')

    let targetUser = await this.userRepository.findById(user.id)
    const mapUpdateUser = mapper.mapObjToCls(UserUpdate, user)

    if (mapUpdateUser.password) targetUser.password = mapUpdateUser.password

    const updatedUser = await this.userRepository.update(targetUser)

    return mapper.mapObjToCls(UserResponse, updatedUser)
  }

  async deleteUser(id: string) {
    validateUser.validateUserId(id)
    const deletedUser = await this.userRepository.delete(id)

    return mapper.mapObjToCls(UserResponse, deletedUser)
  }

  async userSendMsg(id: string) {
    const msgProducer = new MsgProducer()
    await msgProducer.connect()

    const foundUser = await this.userRepository.findById(id)

    const msgValue = { fromUser: foundUser.id, msg: `say hello from ${foundUser.userName}` }

    await msgProducer.connect()
    await msgProducer.send(TOPIC_USER_SAY_HI, msgValue)
  }
}
