import { pool } from "./db";


export async function getArtists() {
    const result = await pool.query(
        "SELECT * FROM artists ORDER BY last_name DESC"
    );
    return result.rows;
}

