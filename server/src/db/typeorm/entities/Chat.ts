import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import User from "./User"
import Message from "./Message"

@Entity("chats")
export default class Chat {
  @PrimaryColumn("uuid")
  id: string

  @ManyToMany(() => User, (user) => user.first_chat)
  @Column("uuid")
  first_participant: User[]

  @ManyToMany(() => User, (user) => user.second_chat)
  @Column("uuid")
  second_participant: User[]

  @OneToMany(() => Message, (message) => message.chat)
  message: Message
}
