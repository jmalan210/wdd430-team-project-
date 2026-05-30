import { pool } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

type Props = {
    params: Promise<{
        artistId: string;
    }>;
};

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    artist_id: string;
    images: string[]
}

export default async function StoreFrontPage({ params }: Props){
    const { artistId } = await params;
    const artistRes = await pool.query (
        "SELECT * FROM artists where id = $1",[artistId])
    
    const artist = artistRes.rows[0];
    if (!artist) {
        return <div>Artist</div>
    }    
    const productsRes = await pool.query(
        `
        SELECT p.id,
        p.name,
        p.price,
        p.artist_id,
        p.description,
        COALESCE(
        ARRAY_AGG(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL),
        ARRAY[]::text[]
        ) AS images
         FROM products p
         LEFT JOIN product_images pi
         on p.id = pi.product_id
         WHERE p.artist_id = $1
         GROUP BY p.id, p.name, p.price, p.description, p.artist_id

    `, [artistId]
    );
    const products = productsRes.rows as Product[];
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