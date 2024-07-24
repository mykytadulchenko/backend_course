import { configDotenv } from "dotenv"
import express from "express"
import path from "path"
import pgDataSource from "./db/typeorm/dataSource"
import authMiddleware from "./middleware/auth"
import corsHandler from "./middleware/cors"
import authRouter from "./routers/authRouter"
import orderRouter from "./routers/orderRouter"
import userRouter from "./routers/userRouter"
import errHandler from "./utils/serverErrHandler"
import logger from "./logger"

configDotenv({ path: path.resolve(__dirname, "../.env") })

const PORT = process.env.PORT || 3001

const server = express()
server.use(corsHandler)
server.use(express.json())
server.use("/api/auth", authRouter)
server.use(authMiddleware)
server.use("/api/orders", orderRouter)
server.use("/api/users", userRouter)
server.use(errHandler)

server.listen(PORT, async () => {
  if (!pgDataSource.isInitialized) {
    await pgDataSource.initialize()
  }
  logger.info(`Server successfully started on port: ${PORT}`)
})
