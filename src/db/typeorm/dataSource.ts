import { configDotenv } from "dotenv"
import { DataSource } from "typeorm"
import seedData from "./seeds"

configDotenv()

const pgDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // should be false in real projects
  logging: true,
  entities: ["./src/db/typeorm/entities/*.ts"],
  migrationsTableName: "migrations",
  migrations: ["./src/db/typeorm/migrations/*.ts"],
})

export default pgDataSource
