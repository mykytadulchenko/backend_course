import initializeDatabase from "../db/typeorm/dataSource"
import User from "../db/typeorm/entities/User"
import { IUser } from "../types/entities"

class UserService {
  getUserById = async (userId: IUser["id"]) => {
    const dataSource = await initializeDatabase()
    const user = await dataSource.getRepository(User).findOneBy({ id: userId })
    return user
  }

  getAllUsers = async () => {
    const dataSource = await initializeDatabase()
    const users = await dataSource.getRepository(User).find()
    return users
  }

  createUser = async (userDraft: Omit<IUser, "id">) => {
    const dataSource = await initializeDatabase()
    await dataSource.getRepository(User).insert(userDraft)
  }

  removeUser = async (userId: IUser["id"]) => {
    const dataSource = await initializeDatabase()
    await dataSource.getRepository(User).delete({ id: userId })
  }

  partiallyUpdateUser = async (userId: IUser["id"], updateOptions: Partial<IUser>) => {
    const dataSource = await initializeDatabase()
    await dataSource.getRepository(User).update({ id: userId }, updateOptions)
  }

  fullyUpdateUser = async (userId: IUser["id"], updateOptions: Omit<IUser, "id">) => {
    const dataSource = await initializeDatabase()
    await dataSource.getRepository(User).update({ id: userId }, updateOptions)
  }
}

const userService = new UserService()

export default userService
