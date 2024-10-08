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
import OrderDetails from "./OrderDetails"
import User from "./User"

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "decimal", precision: 6, scale: 2 })
  total: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date

  @Column("uuid")
  user_id: string

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date

  @ManyToOne(() => User, (user) => user.order, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  order_details: OrderDetails[]
}
