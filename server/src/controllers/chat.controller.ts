import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import ERROR from "../types/errors"
import {
  baseMessageRequestBodyScheme,
  extendedMessageRequestBodyScheme,
  getChatsRequestBodyScheme,
  getMessagesRequestBodyScheme,
} from "../utils/validationSchemes"
import chatService from "../services/chat.service"

class ChatController {
  getChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = getChatsRequestBodyScheme.safeParse(req.params.userId)
      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      const chats = await chatService.getChatsByUserId(parseResult.data.userId)
      res.status(200).json(chats)
    } catch (err) {
      next(err)
    }
  }

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = getMessagesRequestBodyScheme.safeParse(req.params.chatId)
      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      const messages = await chatService.getMessagesByChatId(parseResult.data.chatId)
      res.status(200).json(messages)
    } catch (err) {
      next(err)
    }
  }

  addMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = extendedMessageRequestBodyScheme
        .omit({ messageId: true })
        .extend({ conversationId: z.string().min(1), receiverId: z.string().min(1) })
        .safeParse(req.body)
      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      await chatService.addMessage(parseResult.data)
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  editMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = extendedMessageRequestBodyScheme.safeParse(req.body)
      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      await chatService.editMessage(parseResult.data)
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }

  deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseResult = baseMessageRequestBodyScheme.safeParse(req.body)
      if (parseResult.error) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }

      await chatService.deleteMessage(parseResult.data)
      res.status(200).send()
    } catch (err) {
      next(err)
    }
  }
}

const chatController = new ChatController()

export default chatController
