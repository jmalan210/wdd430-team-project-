import { pool } from "./db";


export async function getArtists(
    sort?: string,
    mediums: string[] = []) {
    
    const orderBy = getOrderBy(sort);
   
    
    if (mediums.length > 0) {
        const result = await pool.query(
            `SELECT * FROM artists
            WHERE medium = ANY($1)
            ORDER BY ${orderBy}`, [mediums]
        );
        return result.rows;
    }
    const result = await pool.query(
        `
        SELECT * FROM artists
        ORDER BY ${orderBy}
        `
    );
    return result.rows;
}

function getOrderBy(sort?: string) {
    switch (sort) {
            case "last_name":
            return "last_name ASC";
        case "medium":
            return "medium ASC";
        case "business_name":
            return "business_name ASC"
        default:
            return "id ASC"
        
    }
}

export async function getArtistMediums() {
    const result = await pool.query(`
        SELECT DISTINCT medium
        FROM artists
        WHERE medium is NOT NULL
        ORDER BY medium
        `);
    return result.rows.map(row => row.medium);
}