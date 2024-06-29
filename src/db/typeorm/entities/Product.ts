import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import OrderDetails from "./OrderDetails"

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  title: string

  @Column({ type: "decimal", precision: 6, scale: 2 })
  price: number

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  order_details: OrderDetails[]
}
