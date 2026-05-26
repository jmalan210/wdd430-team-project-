import { pool } from "@/lib/db";


function getBucket() {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 6));
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

export async function GET() {
    const bucket = getBucket();
    const result = await pool.query("SELECT * FROM artists");
    const artists = result.rows as {id: number }[];
    const shuffled = shuffle(artists);
    const spotlight = shuffled.slice(0, 2);
    
    const artistIds = spotlight.map((a) => a.id);

    await pool.query(
        `insert into artist_spotlight(bucket, artist_ids)
        values($1, $2)
        on conflict(bucket)
        do update set artist_ids = EXCLUDED.artist_ids`,
        [bucket, artistIds]

    );
    return Response.json({
        ok: true,
        bucket,
        spotlight
    });
}

