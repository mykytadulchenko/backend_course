import { DataSource } from "typeorm"
import User from "./entities/User"
import Product from "./entities/Product"
import Order from "./entities/Order"
import OrderDetails from "./entities/OrderDetails"
import { IOrder, IOrderDetail, IProduct, IUser } from "../../types/entities"

export default async function seedData(this: DataSource) {
  const orderDrafts = [{ total: 1050.5 }, { total: 550.75 }, { total: 200.0 }, { total: 500.75 }]

  const users = (
    await this.getRepository(User).insert([
      { name: "Leanne Graham", username: "Bret74", email: "Sincere@april.biz" },
      { name: "Patricia Lebsack", username: "Karianne_2", email: "Julianne.OConner@kory.org" },
      { name: "Chelsey Dietrich", username: "Kamren777", email: "Lucio_Hettinger@annie.ca" },
      { name: "Clementine Bauch", username: "Samantha82", email: "Nathan@yesenia.net" },
    ])
  ).raw as Array<IUser>

  const orders = (
    await this.getRepository(Order).insert([
      ...users.map(({ id: user_id }, index) => ({ user_id, ...orderDrafts[index] })),
    ])
  ).raw as Array<IOrder>

  const products = (
    await this.getRepository(Product).insert([
      { title: "Phone", price: 500.75 },
      { title: "Laptop", price: 1000.5 },
      { title: "Headphones", price: 50.0 },
      { title: "Tablet", price: 300.0 },
      { title: "Smartwatch", price: 200.0 },
    ])
  ).raw as Array<IProduct>

  const orderDetailsDrafts = [
    [products[1].id, products[2].id],
    [products[0].id, products[2].id],
    [products[4].id],
    [products[0].id],
  ]

  await this.getRepository(OrderDetails).insert([
    ...orders.reduce<Array<IOrderDetail>>((acc, { id: order_id }, index) => {
      acc.push(...orderDetailsDrafts[index].map((product_id) => ({ order_id, product_id, qty: 1 })))
      return acc
    }, []),
  ])
}
