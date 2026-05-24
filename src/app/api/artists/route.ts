import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    const result = await pool.query("SELECT * FROM artists ORDER BY id DESC");
    return Response.json(result.rows);
}