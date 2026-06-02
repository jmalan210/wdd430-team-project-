import { pool } from "@/lib/db";
import { getArtistProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";




export default async function StoreFrontPage({ params, }: { params: { artistId: string }; }) {
    const artistId = parseInt(params.artistId);
    const artistRes = await pool.query(
        "Select * from artists where id = $1", [artistId]
    );

    const artist = artistRes.rows[0];
    if (!artist) {
        return <div>Artist Not Found</div>;
    }
    const products = await getArtistProducts(artistId);
    console.log("artistId:", artistId);
    console.log("products:", products); 
    console.log("params:", params);
    console.log("artistId raw:", params?.artistId);
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