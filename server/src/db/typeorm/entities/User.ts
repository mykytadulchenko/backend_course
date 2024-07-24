import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Order from "./Order"
import JWT from "./JWT"

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
}
