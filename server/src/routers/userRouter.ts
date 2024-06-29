import { Router } from "express"
import userController from "../controllers/user.controller"

const userRouter = Router()

userRouter.get("/users/:id", userController.getUserById)

userRouter.get("/users", userController.getAllUsers)

userRouter.post("/users", userController.createUser)

userRouter.delete("/users/:id", userController.removeUser)

userRouter.patch("/users/:id", userController.partiallyUpdateUser)

userRouter.put("/users/:id", userController.fullyUpdateUser)

export default userRouter
