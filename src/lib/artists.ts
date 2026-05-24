import { pool } from "./db";

export async function getArtists() {
    const result = await pool.query(
        "SELECT * FROM artists ORDER BY last_name DESC"
    );
    return result.rows;
}

export async function getRandomSpotlightArtist(count = 2) {
    const result = await pool.query(
        `SELECT * FROM artists
        ORDER BY RANDOM()
        LIMIT $1`,
        [count]
    )
    return result.rows;
}