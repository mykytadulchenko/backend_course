import { Request } from "express"
import * as core from "express-serve-static-core"

interface Params extends core.ParamsDictionary {
  id: string
}

interface Query extends core.Query {
  limit: string
  page: string
}

export interface IRequest<T = unknown> extends Request {
  body: T
  params: Params
  query: Query
}
