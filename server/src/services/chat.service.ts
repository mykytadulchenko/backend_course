import pgDataSource from "../db/typeorm/dataSource"
import Chat from "../db/typeorm/entities/Chat"
import Message from "../db/typeorm/entities/Message"

class ChatService {
  getChatsByUserId = async (userId: string) => {
    const chats = await pgDataSource
      .getRepository(Chat)
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.message", "message")
      .where("chat.first_participant = :first", { first: userId })
      .orWhere("chat.second_participant = :second", { second: userId })
      .distinctOn(["chat.id"])
      .orderBy("chat.id")
      .addOrderBy("message.send_at", "DESC")
      .getRawMany()

    return chats
  }

  getMessagesByChatId = async (chatId: string) => {
    const messages = await pgDataSource
      .getRepository(Message)
      .createQueryBuilder("message")
      .select()
      .where("message.conversation_id = :id", { id: chatId })
      .orderBy("message.send_at", "ASC")
      .getRawMany()

    return messages
  }

  addMessage = async ({
    initiatorId,
    receiverId,
    body,
    conversationId,
  }: {
    initiatorId: string
    receiverId: string
    body: string
    conversationId: string
  }) => {
    await pgDataSource
      .getRepository(Message)
      .insert({ sender: initiatorId, receiver: receiverId, body, conversation_id: conversationId })
  }

  editMessage = async ({ messageId, initiatorId, body }: { messageId: string; initiatorId: string; body: string }) => {
    await pgDataSource.getRepository(Message).update({ id: messageId }, { body })
  }

  deleteMessage = async ({ messageId, initiatorId }: { messageId: string; initiatorId: string }) => {
    await pgDataSource.getRepository(Message).delete({ id: messageId })
  }
}

const chatService = new ChatService()

export default chatService
