import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Chat from "./Chat"
import JWT from "./JWT"
import Message from "./Message"
import Order from "./Order"

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 32 })
  name: string

  @Column({ type: "varchar", length: 16 })
  username: string

  @Column({ type: "varchar", length: 32 })
  email: string

  @Column({ type: "varchar", length: 255 })
  password: string

  @OneToMany(() => Order, (order) => order.user)
  order: Order[]

  @OneToMany(() => JWT, (jwt) => jwt.user)
  jwt: JWT[]

  @ManyToMany(() => Chat, (chat) => chat.first_participant)
  first_chat: Chat[]

  @ManyToMany(() => Chat, (chat) => chat.second_participant)
  second_chat: Chat[]

  @OneToMany(() => Message, (message) => message.sender)
  sendMessage: Message[]

  @OneToMany(() => Message, (message) => message.receiver)
  receiveMessage: Message[]
}
