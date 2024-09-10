import { createAsyncThunk } from "@reduxjs/toolkit"
import client from "../../utils/axios"
import { getTokens } from "../../utils/tokensHandler"
import { IOrder } from "../reducers/orderReducer"

export const fetchOrders = createAsyncThunk<IOrder[], string>("order/fetchOrders", async (userId, api) => {
  try {
    const response = await client.get(`/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${getTokens()?.accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    return api.rejectWithValue(err.message)
  }
})
