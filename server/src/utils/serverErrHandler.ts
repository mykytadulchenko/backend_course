import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import logger from "../logger"
import ERROR from "../types/errors"

const errHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack)
  console.log(err.stack)
  res.status(500).send(ERROR.SERVER_ERROR)
}

export default errHandler
