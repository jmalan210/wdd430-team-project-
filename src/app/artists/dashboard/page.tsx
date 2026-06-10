import { auth } from "@/auth";
import ArtistDashboard from "@/components/ArtistDashboard";
import { pool } from "@/lib/db";

export default async function page() {
    const session = await auth();

    if (!session) return <p>Not Authorized</p>;
    if (session.user.role !== "artist") {
        return <p className="text-center text-xl">Not Authorized</p>
    }


    


    const result = await pool.query(
        `select * from artists where user_id = $1`,
        [session.user.id]
    );
    console.log("session.user.id:", session.user.id);
    console.log("rows:", result.rows);

    if (result.rows.length === 0) {
        return <p>No artist profile found.</p>
    }
    const artist = result.rows[0];

    const productsResult = await pool.query(
        `select * from products where artist_id = $1`, [artist.id]
    );

    const products = productsResult.rows
    return (
        <ArtistDashboard artist={artist} products={products} />
    );

}