import { configDotenv } from "dotenv"
import express from "express"
import corsHandler from "./middleware/cors"
import orderRouter from "./routers/orderRouter"
import userRouter from "./routers/userRouter"
import errHandler from "./utils/serverErrHandler"

configDotenv()

const PORT = process.env.PORT || 3001

const server = express()
server.use(corsHandler)
server.use(express.json())
server.use(orderRouter)
server.use(userRouter)
server.use(errHandler)

server.listen(PORT, () => {
  console.log(`Server successfully started on port: ${PORT}`)
})
