export interface IUser {
  id: string
  name: string
  username: string
  email: string
  password: string
}

export interface IOrder {
  id: string
  total: number
  created_at: Date
  user_id: string
}

export interface IProduct {
  id: string
  title: string
  price: number
}

export interface IOrderDetail {
  order_id: string
  product_id: string
  qty: number
}
