import { NextFunction, Response } from "express"
import userService from "../services/user.service"
import { IUser } from "../types/entities"
import ERROR from "../types/errors"
import { IRequest } from "../types/request"
import { hashPassword } from "../utils/passwordHandler"

class UserController {
  getUserById = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(req.params.id)
      if (!user) {
        res.status(404).send(ERROR.NOT_FOUND)
        return
      }
      res.json(user)
    } catch (err) {
      next(err)
    }
  }

  getAllUsers = async (_: IRequest, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (err) {
      next(err)
    }
  }

  removeUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      await userService.removeUser(req.params.id)
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  partiallyUpdateUser = async (req: IRequest<IUser>, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      const user = await userService.getUserById(req.params.id)
      if (!user) {
        res.status(404).send(ERROR.NOT_FOUND)
        return
      }

      const password = await (req.body.password ? hashPassword(req.body.password) : req.body.password)
      const updatedUser = { ...user, ...req.body, password }
      await userService.partiallyUpdateUser(user.id, updatedUser)
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  fullyUpdateUser = async (req: IRequest<IUser>, res: Response, next: NextFunction) => {
    try {
      const { name, username, email, password } = req.body
      if (!req.params.id || !name || !username || !email) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      const hashedPassword = await hashPassword(req.body.password)
      await userService.fullyUpdateUser(req.params.id, { ...req.body, password: hashedPassword })
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}

const userController = new UserController()

export default userController
