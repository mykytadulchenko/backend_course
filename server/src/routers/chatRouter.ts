import { Router } from "express"
import chatController from "../controllers/chat.controller"

const chatRouter = Router()

chatRouter.get("/chats/:userId", chatController.getChats)

chatRouter.get("/messages/:chatId", chatController.getMessages)

chatRouter.post("/messages", chatController.addMessage)

chatRouter.patch("/messages", chatController.editMessage)

chatRouter.delete("/messages", chatController.deleteMessage)

export default chatRouter
