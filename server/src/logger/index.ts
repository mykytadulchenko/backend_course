import pino from "pino"

const logger = pino(
  {
    mixin() {
      return {
        app: "express_server",
      }
    },
  },
  pino.destination("./server.log"),
)

export default logger
