const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    database: "pernblog",
    port: 5432
})

module.exports = pool;