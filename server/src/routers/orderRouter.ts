import { Router } from "express"
import orderController from "../controllers/order.controller"

const orderRouter = Router()

orderRouter.get("/orders/:userId", orderController.getOrdersByUserId)

orderRouter.get("/orders/:orderId/products/qty", orderController.getOrderProductQty)

orderRouter.get("/products", orderController.searchProductsByTitle)

export default orderRouter
