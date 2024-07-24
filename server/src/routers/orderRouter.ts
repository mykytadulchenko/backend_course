import { Router } from "express"
import orderController from "../controllers/order.controller"

const orderRouter = Router()

orderRouter.get("/:userId", orderController.getOrdersByUserId)

orderRouter.get("/:orderId/products/qty", orderController.getOrderProductQty)

orderRouter.get("/products", orderController.searchProductsByTitle)

export default orderRouter
