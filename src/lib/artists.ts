import { pool } from "./db";
import { seededRandom } from "./utils";

export async function getArtists() {
    const result = await pool.query(
        "SELECT * FROM artists ORDER BY last_name DESC"
    );
    return result.rows;
}

export function getRandomSpotlightArtist(artists: any[], bucket: number, count = 2) {
    return [...artists]
        .sort(() => seededRandom(bucket) - 0.5)
        .slice(0, count);

}