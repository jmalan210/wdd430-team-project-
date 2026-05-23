import ArtistCard from "@/components/ArtistCard";
import ProductSpotlightCard from "@/components/ProductSpotlightCard";

export default function Home() {
  return (
    <main className="bg-ivory">
      <div className="flex">
      <div className="flex flex-col w-1/2">
        <ArtistCard />
        <ArtistCard />
        <ArtistCard />
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <ProductSpotlightCard />
        </div>
        </div>
    </main>
  );
}
