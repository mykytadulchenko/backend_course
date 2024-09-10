import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import Chat from "./Chat"
import User from "./User"

@Entity("messages")
export default class Message {
  @PrimaryColumn("uuid")
  id: string

  @Column({ type: "varchar", length: "255" })
  body: string

  @Column("uuid")
  conversation_id: string

  @Column("uuid")
  sender: string

  @Column("uuid")
  receiver: string

  @CreateDateColumn({ type: "timestamp" })
  send_at: Date

  @ManyToOne(() => User, (user) => user.sendMessage)
  @JoinColumn({ name: "sender" })
  senderUser: User

  @ManyToOne(() => User, (user) => user.receiveMessage)
  @JoinColumn({ name: "receiver" })
  receiverUser: User

  @ManyToOne(() => Chat, (chat) => chat.message, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "conversation_id" })
  chat: Chat
}
