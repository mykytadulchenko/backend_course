import { Router } from "express"
import authController from "../controllers/auth.controller"

const authRouter = Router()

authRouter.post("/sign-in", authController.signIn)

authRouter.post("/sign-up", authController.signUp)

authRouter.post("/", authController.refreshToken)

export default authRouter
