import { NextFunction, Request, Response } from "express"
import { IRequest } from "../types/request"
import { IUser } from "../types/entities"
import ERROR from "../types/errors"
import userService from "../services/user.service"
import { comparePassword, hashPassword } from "../utils/passwordHandler"
import tokenGenerator from "../utils/generateTokens"
import authService from "../services/auth.service"
import { refreshTokenScheme, signInScheme, signUpScheme } from "../utils/validationSchemes"
import logger from "../logger"

class AuthController {
  signIn = async (req: IRequest<Omit<IUser, "id" | "name" | "email">>, res: Response, next: NextFunction) => {
    try {
      const parseResult = signInScheme.safeParse(req.body)

      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      const { username, password } = parseResult.data

      const userFromDB = await userService.getUserByUsername(username)
      if (!userFromDB) {
        res.status(401).send("Invalid credentials")
        return
      }

      const passwordCheck = await comparePassword(password, userFromDB.password)
      if (!passwordCheck) {
        res.status(401).send("Invalid credentials")
        return
      }

      const tokens = tokenGenerator.generate({ id: userFromDB.id, username: userFromDB.username })
      await authService.setTokens(userFromDB.id, tokens)
      res.status(200).send(tokens)
    } catch (err) {
      next(err)
    }
  }

  signUp = async (req: IRequest<Omit<IUser, "id">>, res: Response, next: NextFunction) => {
    try {
      const parseResult = signUpScheme.safeParse(req.body)

      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      const hashedPassword = await hashPassword(parseResult.data.password)
      await userService.createUser({ ...parseResult.data, password: hashedPassword })

      res.status(201).send()
    } catch (err) {
      next(err)
    }
  }

  refreshToken = async (
    req: IRequest<{ accessToken: string; refreshToken: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const parseResult = refreshTokenScheme.safeParse(req.body)

      if (parseResult.error) {
        res.status(403).send("Unauthorized!")
        return
      }
      const { accessToken } = parseResult.data
      const { id, username } = tokenGenerator.decodePayload(accessToken)
      const { refresh_token } = await authService.getTokensByUserId(id)
      tokenGenerator.verifyToken(refresh_token)
      const tokenUpdate = {
        refreshToken: refresh_token,
        accessToken: tokenGenerator.generateAccessToken({ id, username }),
      }
      await authService.updateTokens(id, tokenUpdate)
      res.status(200).send(tokenUpdate)
    } catch (err: any) {
      logger.error(err.stack)
      res.status(403).send("Unauthorized!")
    }
  }
}

const authController = new AuthController()
export default authController
