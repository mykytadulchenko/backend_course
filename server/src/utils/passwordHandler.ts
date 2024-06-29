import * as bcrypt from "bcrypt"
import { configDotenv } from "dotenv"
import path from "path"

configDotenv({ path: path.resolve(__dirname, "../../.env") })

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, +process.env.SALT_ROUNDS!)
  return hash
}

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.hash(password, hash)
  return result
}
