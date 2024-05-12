import { NextFunction, Router, type Request, type Response } from "express"
import pool from "../db/dbAuth"
import queries from "../db/queries"
import ERROR from "../types/errors"

const userRouter = Router()

userRouter.get("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await pool.query(queries.GET_USER_QUERY, [req.params.id])
    if (!user.rows[0]) {
      res.status(404).send(ERROR.NOT_FOUND)
      return
    }
    res.json(user.rows[0])
  } catch (err) {
    next(err)
  }
})

userRouter.get("/users", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await pool.query(queries.GET_USERS_QUERY)
    res.json(users.rows)
  } catch (err) {
    next(err)
  }
})

userRouter.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email } = req.body
    if (!name || !username || !email) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    await pool.query(queries.SET_USER_QUERY, [name, username, email])
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

userRouter.delete("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    await pool.query(queries.DELETE_USER_QUERY, [req.params.id])
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.patch("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    const user = await pool.query(queries.GET_USER_QUERY, [req.params.id])
    if (!user.rows[0]) {
      res.status(404).send(ERROR.NOT_FOUND)
      return
    }
    const updatedUser = { ...user.rows[0], ...req.body }
    const { id, name, username, email } = updatedUser
    await pool.query(queries.EDIT_USER_QUERY, [id, name, username, email])
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.put("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email } = req.body
    if (!req.params.id || !name || !username || !email) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    await pool.query(queries.EDIT_USER_QUERY, [req.params.id, name, username, email])
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

export default userRouter
