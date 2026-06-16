import ArtistCard from "@/components/ArtistCard";
import ProductCard from "@/components/ProductCard";
import { getSpotlightArtists } from "@/lib/spotlight";
import { getSpotlightProducts } from "@/lib/spotlight";



export default async function Home() {
  const artists = await getSpotlightArtists();
  
  const products = await getSpotlightProducts();
  console.log(products)
  
  return (
    <main className="bg-ivory">
      <div className="flex flex-col md:flex-row gap-8 m-4 bg-ivory">

        <div className="flex flex-col gap-4 border-navy shadow-lg p-8 bg-[linear-gradient(to_bottom_right,#2b4b64,#788E79,#935739)] rounded-lg w-full md:w-1/2">
          <h2 className="text-3xl font-bold bg-ivory text-navy p-2 text-center rounded-xl">Artist Spotlight</h2>
          {artists.map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        <div className="flex flex-col gap-4 border-navy shadow-lg p-8 bg-[linear-gradient(to_bottom_right,#2b4b64,#788E79,#935739)] rounded-lg w-full md:w-1/2">
          <h2 className="text-3xl font-bold bg-ivory text-navy p-2 text-center rounded-xl">Highlighted Product</h2>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
         
        </div>
        </div>
    </main>
  );
}
