import ArtistCard from "@/components/ArtistCard";
import ProductCard from "@/components/ProductCard";
import { getSpotlightArtists } from "@/lib/spotlight";
import { getSpotlightProducts } from "@/lib/spotlight";



export default async function Home() {
  const artists = await getSpotlightArtists();
  
  const products = await getSpotlightProducts();
  
  return (
    <main className="bg-ivory">
      <div className="flex">

        <div className="flex flex-col w-1/2 gap-4 border-4 border-navy shadow-lg p-8 bg-white m-8 rounded-lg">
          <h2 className="text-3xl font-bold bg-navy text-white p-2 text-center">Artist Spotlight</h2>
          {artists.map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        <div className="flex flex-col w-1/2 gap-4 border-4 border-navy shadow-lg p-8 bg-white m-8 rounded-lg">
          <h2 className="text-3xl font-bold bg-navy text-white p-2 text-center">Highlighted Product</h2>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
         
        </div>
        </div>
    </main>
  );
}
