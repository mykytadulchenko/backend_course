import { Router } from "express"
import userController from "../controllers/user.controller"

const userRouter = Router()

userRouter.get("/:id", userController.getUserById)

userRouter.get("/", userController.getAllUsers)

userRouter.delete("/:id", userController.removeUser)

userRouter.patch("/:id", userController.partiallyUpdateUser)

userRouter.put("/:id", userController.fullyUpdateUser)

export default userRouter
