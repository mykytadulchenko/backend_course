import { NextFunction, Request, Response } from "express"
import ERROR from "../types/errors"
import orderService from "../services/order.service"
import { IRequest } from "../types/request"

class OrderController {
  getOrdersByUserId = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.userId) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      const { limit = null, page = 1 } = req.query as { limit: string | null; page: string }
      const data = await orderService.getOrdersByUserId(req.params.userId, Number(limit), Number(limit) * (+page - 1))
      res.json(data)
    } catch (err) {
      next(err)
    }
  }

  getOrderProductQty = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.orderId) {
        res.status(400).send(ERROR.BAD_REQUEST)
        return
      }
      const data = await orderService.getOrderProductQty(req.params.orderId)
      if (!data) {
        res.status(404).send(ERROR.NOT_FOUND)
        return
      }
      res.json(data)
    } catch (err) {
      next(err)
    }
  }

  searchProductsByTitle = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { search = "" } = req.query
      const data = await orderService.searchProductsByTitle(`%${(search as string).toLowerCase().trim()}%`)
      res.json(data)
    } catch (err) {
      next(err)
    }
  }
}

const orderController = new OrderController()

export default orderController
