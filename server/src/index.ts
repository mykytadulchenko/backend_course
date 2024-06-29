import { configDotenv } from "dotenv"
import express from "express"
import path from "path"
import pgDataSource from "./db/typeorm/dataSource"
import corsHandler from "./middleware/cors"
import orderRouter from "./routers/orderRouter"
import userRouter from "./routers/userRouter"
import errHandler from "./utils/serverErrHandler"

configDotenv({ path: path.resolve(__dirname, "../.env") })

const PORT = process.env.PORT || 3001

const server = express()
server.use(corsHandler)
server.use(express.json())
server.use(orderRouter)
server.use(userRouter)
server.use(errHandler)

server.listen(PORT, async () => {
  if (!pgDataSource.isInitialized) {
    await pgDataSource.initialize()
  }
  console.log(`Server successfully started on port: ${PORT}`)
})
