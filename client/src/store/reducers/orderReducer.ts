import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { resetStore } from "../../actions"
import { fetchOrders } from "../thunks/orderThunks"

export interface IOrder {
  id: string
  total: number
}

const initialState: { orders: Array<IOrder>; error: string } = {
  orders: [],
  error: "",
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Array<IOrder>>) => {
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action: PayloadAction<any, string>) => {
        state.error = action.payload
      })
      .addCase(resetStore, () => initialState)
  },
})

export default orderSlice.reducer
