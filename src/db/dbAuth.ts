import pg from "pg"

const pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "postgres",
  port: 5432,
  database: "db_b_e_course",
})

export default pool
