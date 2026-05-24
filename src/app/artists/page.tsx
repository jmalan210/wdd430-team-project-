import ArtistCard from "@/components/ArtistCard";
import { getArtists } from "@/lib/artists";
export default async function ArtistsPage() {

    const artists = await getArtists();

    return (
        <main className="p-8">

            <h1 className="text-4xl font-bold mb-6" >Artists</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {artists.map((artist: any)=> (
                <ArtistCard key={artist.id} artist={artist} />
                 ))}
            </div>
            
        </main>
    )
}