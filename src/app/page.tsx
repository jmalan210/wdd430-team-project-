import { pool } from "@/lib/db";
import ArtistCard from "@/components/ArtistCard";
import ProductSpotlightCard from "@/components/ProductSpotlightCard";

function getBucket() {
    return Math.floor(Date.now() / (1000 * 60));
}

export default async function Home() {
  
  const bucket = getBucket();
  const spotlightArtists = await pool.query("SELECT artist_ids from artist_spotlight WHERE bucket = $1", [bucket]);
  let artistIds = spotlightArtists.rows[0]?.artist_ids;

  //fallback to most recent spotlight
  if (!artistIds || artistIds.length === 0) {
    const latest = await pool.query(
      "SELECT artist_ids FROM artist_spotlight ORDER BY bucket DESC LIMIT 1"
    );
    artistIds = latest.rows[0]?.artist_ids;
  }

  //fallback to random artist
  let artists;

  if (!artistIds || artistIds.length === 0) {
    const fallback = await pool.query(
      "SELECT * FROM artists ORDER BY RANDOM() LIMIT 2"
    );
    artists = fallback.rows;
  } else {
    const result = await pool.query("SELECT * FROM artists where id = ANY($1)", [artistIds]);

    artists = result.rows
    
  }
  
  return (
    <main className="bg-ivory">
      <div className="flex">

        <div className="flex flex-col w-1/2 gap-4 border-4 border-navy shadow-lg p-8 bg-white m-8 rounded-lg">
          <h2 className="text-3xl font-bold bg-navy text-white p-2 text-center">Artist Spotlight</h2>
          {artists.map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <ProductSpotlightCard />
        </div>
        </div>
    </main>
  );
}
