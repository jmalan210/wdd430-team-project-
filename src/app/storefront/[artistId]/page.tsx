import { pool } from "@/lib/db";
import { getArtistProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";




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
        <div>
            <h1 className="text-center text-4xl ">{artist?.business_name}</h1>
            <h2 className="text-center">Product Offerings</h2>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
           
            
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                
            ))}
            </div>
            </div>
    )
}