import axios from "axios"
import { getTokens, removeTokens, setTokens } from "./tokensHandler"
import { resetStore } from "../actions"
import { store } from ".."

const client = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

client.interceptors.response.use(null, async (error) => {
  if (error.response.status === 401) {
    removeTokens()
    store.dispatch(resetStore())
  } else if (error.response.status === 403) {
    const originalRequest = error.config
    const refreshResponse = await client.post("/auth/", getTokens())
    if (refreshResponse.status !== 200) return refreshResponse
    setTokens(refreshResponse.data)
    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`
    const retry = await client(originalRequest)
    return retry
  } else {
    throw new Error(error.response.data)
  }
})

export default client
