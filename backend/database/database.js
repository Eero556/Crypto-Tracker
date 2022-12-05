const { Pool } = require("pg")
require("dotenv").config()

const env = process.env
const pool = new Pool({
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    password: env.DATABASE_PASSWORD,
    user: env.DATABASE_USER,
    port: env.DATABASE_PORT
})

module.exports = pool

