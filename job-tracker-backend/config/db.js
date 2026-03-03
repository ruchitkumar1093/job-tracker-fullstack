const mysql = require("mysql2/promise");
const { Pool } = require("pg");

let db;
let isPostgres = false;

if (process.env.DB_TYPE === "postgres") {
    console.log("Using PostgreSQL database");
    isPostgres = true;

    db = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL === "true"
            ? { rejectUnauthorized: false }
            : false,
    });

} else {
    console.log("Using MySQL database");

    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

async function query(sql, params = []) {
    if (isPostgres) {
        let index = 0;

        // Convert ? placeholders to $1, $2, $3 for PostgreSQL
        const convertedSql = sql.replace(/\?/g, () => `$${++index}`);

        const result = await db.query(convertedSql, params);
        return result.rows;
    } else {
        const [rows] = await db.query(sql, params);
        return rows;
    }
}

module.exports = { query };