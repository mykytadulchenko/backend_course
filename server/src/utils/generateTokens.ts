import { configDotenv } from "dotenv"
import * as JWT from "jsonwebtoken"
import path from "path"
import { ITokenPayload } from "../types"

configDotenv({ path: path.resolve(__dirname, "../../.env") })

class TokenGenerator {
  generate = (payload: { id: string; username: string }) => ({
    refreshToken: JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    }),
    accessToken: JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "10s",
    }),
  })

  generateAccessToken = (payload: { id: string; username: string }) =>
    JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "10s",
    })

  generateRefreshToken = (payload: { id: string; username: string }) =>
    JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

  decodePayload = (token: string) => JWT.decode(token) as ITokenPayload

  verifyToken = (token: string) => JWT.verify(token, process.env.JWT_SECRET!)
}

const tokenGenerator = new TokenGenerator()

export default tokenGenerator
