import { useEffect } from "react"
import { useSelector } from "react-redux"
import useDispatchStore from "../hooks/useDispatchStore"
import { State } from "../store/store"
import { fetchOrders } from "../store/thunks/orderThunks"

const Dashboard = () => {
  const dispatch = useDispatchStore()
  const user = useSelector((state: State) => state.user)
  const { orders } = useSelector((state: State) => state.order)
  useEffect(() => {
   dispatch(fetchOrders(user.id!))
  }, [])
  return (
    <div>
      <div>Orders</div>
      {orders.length ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>ID: {order.id}</p>
              <p>Total: {order.total}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
export default Dashboard
