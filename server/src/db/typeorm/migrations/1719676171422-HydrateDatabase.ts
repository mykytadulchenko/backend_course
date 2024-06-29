import { MigrationInterface, QueryRunner } from "typeorm"
import { IOrder, IOrderDetail, IProduct, IUser } from "../../../types/entities"
import Order from "../entities/Order"
import OrderDetails from "../entities/OrderDetails"
import Product from "../entities/Product"
import User from "../entities/User"

export class HydrateDatabase1719676171422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const orderDrafts = [{ total: 1050.5 }, { total: 550.75 }, { total: 200.0 }, { total: 500.75 }]

    const users: Array<IUser> = (
      await queryRunner.manager.getRepository(User).insert([
        { name: "Leanne Graham", username: "Bret74", email: "Sincere@april.biz", password: "12345Great!" },
        {
          name: "Patricia Lebsack",
          username: "Karianne_2",
          email: "Julianne.OConner@kory.org",
          password: "12345Great!",
        },
        { name: "Chelsey Dietrich", username: "Kamren777", email: "Lucio_Hettinger@annie.ca", password: "12345Great!" },
        { name: "Clementine Bauch", username: "Samantha82", email: "Nathan@yesenia.net", password: "12345Great!" },
      ])
    ).raw

    const orders: Array<IOrder> = (
      await queryRunner.manager
        .getRepository(Order)
        .insert([...users.map(({ id: user_id }, index) => ({ user_id, ...orderDrafts[index] }))])
    ).raw

    const products: Array<IProduct> = (
      await queryRunner.manager.getRepository(Product).insert([
        { title: "Phone", price: 500.75 },
        { title: "Laptop", price: 1000.5 },
        { title: "Headphones", price: 50.0 },
        { title: "Tablet", price: 300.0 },
        { title: "Smartwatch", price: 200.0 },
      ])
    ).raw

    const orderDetailsDrafts = [
      [products[1].id, products[2].id],
      [products[0].id, products[2].id],
      [products[4].id],
      [products[0].id],
    ]

    await queryRunner.manager.getRepository(OrderDetails).insert([
      ...orders.reduce<Array<IOrderDetail>>((acc, { id: order_id }, index) => {
        acc.push(...orderDetailsDrafts[index].map((product_id) => ({ order_id, product_id, qty: 1 })))
        return acc
      }, []),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(OrderDetails).clear()
    await queryRunner.manager.getRepository(Order).clear()
    await queryRunner.manager.getRepository(Product).clear()
    await queryRunner.manager.getRepository(User).clear()
  }
}
