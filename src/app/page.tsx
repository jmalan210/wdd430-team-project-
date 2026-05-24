export const revalidate = 21600;
import ArtistCard from "@/components/ArtistCard";
import ProductSpotlightCard from "@/components/ProductSpotlightCard";
import { getRandomSpotlightArtist } from "@/lib/artists";


export default async function Home() {
  
  const spotlightArtists =  await getRandomSpotlightArtist(2);
  return (
    <main className="bg-ivory">
      <div className="flex">

        <div className="flex flex-col w-1/2 gap-4 border-4 border-navy shadow-lg p-8 bg-white m-8 rounded-lg">
          <h2 className="text-3xl font-bold bg-navy text-white p-2 text-center">Artist Spotlight</h2>
          {spotlightArtists.map((artist: any) => (
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
