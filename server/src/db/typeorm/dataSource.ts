import { configDotenv } from "dotenv"
import path from "path"
import { DataSource } from "typeorm"

configDotenv({ path: path.resolve(__dirname, "../../../../.env") })

const pgDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [path.resolve(__dirname, "entities/*.ts")],
  migrationsTableName: "migrations",
  migrations: [path.resolve(__dirname, "migrations/*.ts")],
  installExtensions: true,
  uuidExtension: "uuid-ossp",
})

export default pgDataSource
