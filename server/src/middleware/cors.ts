import { NextFunction, Request, Response } from "express"

const corsHandler = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.setHeader("Access-Control-Expose-Headers", "Authorization")

  if (req.method === "OPTIONS") res.status(204).send()
  else next()
}

export default corsHandler
