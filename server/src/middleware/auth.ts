import { NextFunction, Request, Response } from "express"
import * as JWT from "jsonwebtoken"
import tokenGenerator from "../utils/generateTokens"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1]
    tokenGenerator.verifyToken(token)
    next()
  } catch (err) {
    if (err instanceof JWT.TokenExpiredError) {
      res.status(403).send()
    } else {
      res.status(401).send("Unauthorized!")
    }
  }
}

export default authMiddleware
