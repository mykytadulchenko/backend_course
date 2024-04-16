import { Router, type Request, type Response } from "express"
import data from "../data"

const userRouter = Router()

userRouter.options("*", async (_: Request, res: Response) => {
  res.status(200).end()
})

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const user = data.find((el) => el.id === +req.params.id)
  if (!user) {
    res.status(404).send()
    return
  }
  res.json(user)
})

userRouter.get("/users", async (_: Request, res: Response) => {
  res.json(data)
})

userRouter.post("/users", async (req: Request, res: Response) => {
  data.push(req.body)
  res.json(data)
})

userRouter.delete("/users/:id", async (req: Request, res: Response) => {
  const userIndex = data.findIndex((el) => el.id === +req.params.id)
  data.splice(userIndex, 1)
  res.json(data)
})

userRouter.patch("/users/:id", async (req: Request, res: Response) => {
  const userIndex = data.findIndex((el) => el.id === +req.params.id)
  let user = data.splice(userIndex, 1)[0]
  user = { ...user, ...req.body }
  data.push(user)
  res.json(user)
})

userRouter.put("/users/:id", async (req: Request, res: Response) => {
  const userIndex = data.findIndex((el) => el.id === +req.params.id)
  data.splice(userIndex, 1)
  data.push(req.body)
  res.json(data)
})

export default userRouter
