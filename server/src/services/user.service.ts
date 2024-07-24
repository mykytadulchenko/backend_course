import pgDataSource from "../db/typeorm/dataSource"
import User from "../db/typeorm/entities/User"
import { IUser } from "../types/entities"

class UserService {
  getUserById = async (userId: IUser["id"]) => {
    const user = await pgDataSource.getRepository(User).findOneBy({ id: userId })
    return user
  }

  getUserByUsername = async (username: IUser["username"]) => {
    const user = await pgDataSource.getRepository(User).findOneBy({ username })
    return user
  }

  getAllUsers = async () => {
    const users = await pgDataSource.getRepository(User).find()
    return users
  }

  createUser = async (userDraft: Omit<IUser, "id">) => {
    await pgDataSource.getRepository(User).insert(userDraft)
  }

  removeUser = async (userId: IUser["id"]) => {
    await pgDataSource.getRepository(User).delete({ id: userId })
  }

  partiallyUpdateUser = async (userId: IUser["id"], updateOptions: Partial<IUser>) => {
    await pgDataSource.getRepository(User).update({ id: userId }, updateOptions)
  }

  fullyUpdateUser = async (userId: IUser["id"], updateOptions: Omit<IUser, "id">) => {
    await pgDataSource.getRepository(User).update({ id: userId }, updateOptions)
  }
}

const userService = new UserService()

export default userService
