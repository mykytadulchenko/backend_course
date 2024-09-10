import { z } from "zod"

export const signInScheme = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
})

export const signUpScheme = signInScheme.extend({
  email: z.string().email(),
  name: z.string().min(3),
})

export const refreshTokenScheme = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
})

export const getChatsRequestBodyScheme = z.object({
  userId: z.string().min(1),
})

export const getMessagesRequestBodyScheme = z.object({
  chatId: z.string().min(1),
})

export const baseMessageRequestBodyScheme = z.object({
  messageId: z.string().min(1),
  initiatorId: z.string().min(1),
})

export const extendedMessageRequestBodyScheme = baseMessageRequestBodyScheme.extend({
  body: z.string().min(1),
})
