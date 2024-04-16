import express from "express"
import userRouter from "./routers/userRouter"
import corsHandler from "./middleware/cors"

const PORT = 3001

const server = express()
server.use(corsHandler)
server.use(express.json())
server.use(userRouter)

server.listen(PORT, () => {
  console.log(`Server successfully started on port: ${PORT}`)
})
