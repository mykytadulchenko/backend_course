import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import ERROR from "../types/errors"

const errHandler = (err: ErrorRequestHandler, req: Request, res: Response, _: NextFunction) => {
  console.log(err)
  res.status(500).send(ERROR.SERVER_ERROR)
}

export default errHandler
