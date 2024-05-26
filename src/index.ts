import { configDotenv } from "dotenv"
import express from "express"
import pgDataSource from "./db/typeorm/dataSource"
import seedData from "./db/typeorm/seeds"
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

server.listen(PORT, async () => {
  if (!pgDataSource.isInitialized) {
    await pgDataSource.initialize()
    await seedData.call(pgDataSource)
  }
  console.log(`Server successfully started on port: ${PORT}`)
})
