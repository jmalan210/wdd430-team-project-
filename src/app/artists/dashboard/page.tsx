import { auth } from "@/auth";
import ArtistDashboard from "@/components/ArtistDashboard";
import { pool } from "@/lib/db";

export default async function page() {
    const session = await auth();

    if (!session) return <p>Not Authorized</p>;


    


    const result = await pool.query(
        `select * from artists where user_id = $1`,
        [session.user.id]
    );
    console.log("session.user.id:", session.user.id);
    console.log("rows:", result.rows);

    if (result.rows.length === 0) {
        return <p>No artist profile found.</p>
    }
    return (
        <ArtistDashboard artist={result.rows[0]} />
    );

}