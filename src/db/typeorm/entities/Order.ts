import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import User from "./User"
import OrderDetails from "./OrderDetails"

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "decimal", precision: 6, scale: 2 })
  total: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  //   @UpdateDateColumn({ type: "timestamp" })
  //   updated_at: Date

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: "user_id" })
  user: User

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  order_details: OrderDetails[]
}
