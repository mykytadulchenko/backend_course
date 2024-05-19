import { NextFunction, Request, Response } from "express"
import ERROR from "../types/errors"
import userService from "../services/user.service"
import { IUser } from "../types/entities"
import { IRequest } from "../types/request"

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

  createUser = async (req: IRequest<Omit<IUser, "id">>, res: Response, next: NextFunction) => {
    try {
      const { name, username, email } = req.body
      if (!name || !username || !email) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      await userService.createUser(req.body)
      res.status(201).send()
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
      const updatedUser = { ...user, ...req.body }
      const { name, username, email } = updatedUser
      await userService.partiallyUpdateUser(user.id, { name, username, email })
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  fullyUpdateUser = async (req: IRequest<IUser>, res: Response, next: NextFunction) => {
    try {
      const { name, username, email } = req.body
      if (!req.params.id || !name || !username || !email) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      await userService.fullyUpdateUser(req.params.id, { name, username, email })
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}

const userController = new UserController()

export default userController
