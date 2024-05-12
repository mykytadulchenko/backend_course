import { NextFunction, Request, Response, Router } from "express"
import queries from "../db/queries"
import pool from "../db/dbAuth"
import ERROR from "../types/errors"

const orderRouter = Router()

orderRouter.get("/orders/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.userId) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    const { limit = null, page = 1 } = req.query
    const data = await pool.query(queries.GET_USER_ORDERS, [req.params.userId, limit, Number(limit) * (+page - 1)])
    res.json(data.rows)
  } catch (err) {
    next(err)
  }
})

orderRouter.get("/orders/:orderId/products/qty", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.userId) {
      res.status(400).send(ERROR.BAD_REQUEST)
      return
    }
    const data = await pool.query(queries.GET_ORDER_PRODUCT_QTY_COUNT, [req.params.orderId])
    if (!data.rows[0]) {
      res.status(404).send(ERROR.NOT_FOUND)
      return
    }
    res.json(data.rows[0])
  } catch (err) {
    next(err)
  }
})

orderRouter.get("/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search = "" } = req.query
    const data = await pool.query(queries.GET_PRODUCTS, [`%${(search as string).toLowerCase().trim()}%`])
    res.json(data.rows)
  } catch (err) {
    next(err)
  }
})

export default orderRouter
