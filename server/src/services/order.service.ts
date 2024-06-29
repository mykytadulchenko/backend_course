import pgDataSource from "../db/typeorm/dataSource"
import Order from "../db/typeorm/entities/Order"
import Product from "../db/typeorm/entities/Product"

class OrderService {
  getOrdersByUserId = async (userId: string, limit: number, offset: number) => {
    const orders = await pgDataSource
      .getRepository(Order)
      .createQueryBuilder("orders")
      .where("orders.user_id = :id", { id: userId })
      .limit(limit || undefined)
      .offset(offset)
      .getMany()

    return orders
  }

  getOrderProductQty = async (orderId: string) => {
    const qty = await pgDataSource
      .getRepository(Order)
      .createQueryBuilder("orders")
      .leftJoin("orders.order_details", "order_details")
      .select("orders.id", "id")
      .addSelect("COUNT(order_details.product_id)", "product_qty")
      .where("orders.id = :orderId", { orderId })
      .groupBy("orders.id")
      .getRawOne()

    return qty
  }

  searchProductsByTitle = async (searchStr: string) => {
    const searchResults = pgDataSource
      .getRepository(Product)
      .createQueryBuilder("products")
      .where("LOWER(products.title) LIKE :search", { search: searchStr })
      .getMany()

    return searchResults
  }
}

const orderService = new OrderService()

export default orderService
