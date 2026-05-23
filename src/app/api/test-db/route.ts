// app/api/test-db/route.ts
import { Pool } from "pg";

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const result = await pool.query("SELECT NOW()");

  return Response.json({
    ok: true,
    time: result.rows[0],
  });
}