import { configureStore } from "@reduxjs/toolkit"
import orderReducer from "./reducers/orderReducer"
import userReducer from "./reducers/userReducer"

export const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      order: orderReducer,
    },
  })
}

export type State = ReturnType<typeof createStore>["getState"]
export type AppDispatch = ReturnType<typeof createStore>["dispatch"]
