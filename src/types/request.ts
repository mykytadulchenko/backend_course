import { Request } from "express"

export interface IRequest<T = unknown> extends Request {
  body: T
}
