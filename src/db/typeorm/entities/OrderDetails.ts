import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import Order from "./Order"
import Product from "./Product"

@Entity("order_details")
export default class OrderDetails {
  @PrimaryColumn("uuid")
  order_id: string

  @PrimaryColumn("uuid")
  product_id: string

  @Column("int")
  qty: number

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({ name: "order_id" })
  order: Order

  @ManyToMany(() => Product, (product) => product.order_details)
  @JoinColumn({ name: "product_id" })
  product: Product[]
}
