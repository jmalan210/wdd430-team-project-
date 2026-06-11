import { Pool } from "pg";

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT 1")
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.error("DB FAILED", err));