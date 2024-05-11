import { Router, type Request, type Response } from "express"
import pool from "../db/dbAuth"
import queries from "../db/queries"

const userRouter = Router()

userRouter.options("*", async (_: Request, res: Response) => {
  res.status(200).end()
})

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const user = await pool.query(queries.GET_USER_QUERY, [req.params.id])
  if (!user) {
    res.status(404).send()
    return
  }
  res.json(user.rows[0])
})

userRouter.get("/users", async (_: Request, res: Response) => {
  const users = await pool.query(queries.GET_USERS_QUERY)
  res.json(users.rows)
})

userRouter.post("/users", async (req: Request, res: Response) => {
  const { name, username, email } = req.body
  await pool.query(queries.SET_USER_QUERY, [name, username, email])
  res.status(201).send()
})

userRouter.delete("/users/:id", async (req: Request, res: Response) => {
  await pool.query(queries.DELETE_USER_QUERY, [req.params.id])
  res.status(200).send()
})

userRouter.patch("/users/:id", async (req: Request, res: Response) => {
  const user = await pool.query(queries.GET_USER_QUERY, [req.params.id])
  if (!user) {
    res.status(404).send()
    return
  }
  const updatedUser = { ...user.rows[0], ...req.body }
  const { id, name, username, email } = updatedUser
  await pool.query(queries.EDIT_USER_QUERY, [id, name, username, email])
  res.status(200).send()
})

userRouter.put("/users/:id", async (req: Request, res: Response) => {
  const { name, username, email } = req.body
  await pool.query(queries.EDIT_USER_QUERY, [req.params.id, name, username, email])
  res.status(200).send()
})

export default userRouter
