import { pool } from "./db";
import {  getProductsByIds } from "./products";

function getBucket() {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 6)); //refreshes every 6 hours
} 

function shuffle(array: any[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr
}

export async function getSpotlightArtists() {
    const bucket = getBucket();
    const existing = await pool.query("SELECT artist_ids FROM artist_spotlight WHERE bucket = $1", [bucket]);
    let artistIds = existing.rows[0]?.artist_ids;

    if (!artistIds || artistIds.length === 0) {
        const artistsResult = await pool.query("SELECT * FROM artists");

        const artists = artistsResult.rows;
        const shuffled = shuffle(artists);
        const spotlight = shuffled.slice(0, 2);
        artistIds = spotlight.map((a) => a.id);
         await pool.query(
        `insert into artist_spotlight(bucket, artist_ids)
        values($1, $2)
        ON CONFLICT (bucket)
        DO NOTHING
        `,
        [bucket, artistIds]

    );
    }
    const result = await pool.query("SELECT * FROM artists WHERE id = ANY($1)", [artistIds]);
    
    return result.rows;
}

export async function getSpotlightProducts() {
    const bucket = getBucket();
    const existing = await pool.query(
        "SELECT product_ids FROM product_spotlight WHERE bucket = $1", [bucket]
    );
    let productIds: number[] = existing.rows[0]?.product_ids;

    if (!Array.isArray(productIds) || productIds.length === 0) {
        const ids = (await pool.query(`select id from products`)
        ).rows.map(r => r.id);
    
        productIds = shuffle(ids).slice(0, 1);

         await pool.query(
        `insert into product_spotlight(bucket, product_ids)
        values($1, $2)
        ON CONFLICT (bucket)
        DO UPDATE SET product_ids = EXCLUDED.product_ids
        `,
        [bucket, productIds]

    );
    }
    return getProductsByIds(productIds);
}

export async function getProductFeed() {
    const ids = (
        await pool.query(
            `select id from products order by name desc`
        )
    ).rows.map(r => r.id);
    return getProductsByIds(ids);
}