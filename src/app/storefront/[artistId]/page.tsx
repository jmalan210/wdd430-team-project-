import { pool } from "@/lib/db";
import { getArtistProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { head } from "@vercel/blob";




export default async function StoreFrontPage({
    params,
}: {
    params: Promise<{ artistId: string }>;
    }) {
    const { artistId } = await params;
    const artistIdNum = parseInt(artistId, 10);
    if (isNaN(artistIdNum)) {
        return (
            <div>Invalid artistId: {artistId}</div>
        )
    }
    const artistRes = await pool.query(
        "Select * from artists where id = $1", [artistIdNum]
    );

    const artist = artistRes.rows[0];
    if (!artist) {
        return <div>Artist Not Found</div>;
    }
    const products = await getArtistProducts(artistIdNum);
   
    
    return (
        <>
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-l from-navy via-sage to-terracotta text-ivory py-2 my-4">{artist?.business_name}</h1>
            
        <div className="flex flex-col lg:flex-row gap-8">
            
            
            <div className="lg:w-1/4 flex flex-col items-center justify-around p-2 m-4 rounded-lg bg-gradient-to-br from-navy via-sage to-terracotta text-ivory shadow-2xl">
                <div>
                    <p className="font-bold text-2xl">Artist: {artist.first_name} {artist.last_name} </p>
                        <p className="italic">Medium: {artist.medium}</p>
                        </div>
            <div className="relative w-36 h-36 shrink-0 my-2">
                 
                <Image src={artist.image_url || "/images/profile_placeholder.svg"}
                    alt={`${artist.first_name} ${artist.last_name}`}
                    fill
                    sizes="(max-width: 768px) 100vs, 33vw"
                    className="object-cover rounded-lg shadow-lg border-4 border-white" />
            </div> 
                <p>{artist.bio}</p>
                </div>
           
        <div className="lg:w-3/4 m-4">
        <h2 className="text-center text-3xl bg-gradient-to-l from-navy via-sage to-terracotta text-ivory rounded-lg my-4">Product Offerings</h2>
           
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                
            ))}
            </div>
                </div>
                </div>
            
            </>
    )
}