import { configDotenv } from "dotenv"
import { DataSource } from "typeorm"

configDotenv()

const pgDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ["./src/db/typeorm/entities/*.ts"],
  migrations: [],
})

const initializeDatabase = async () => {
  if (!pgDataSource.isInitialized) await pgDataSource.initialize()
  return pgDataSource
}

export default initializeDatabase
