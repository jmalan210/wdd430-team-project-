import { pool } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";



export default async function Page({
    params,
}: {
    params: Promise<{ productId: string }>;
    }) { 
    
    const { productId } = await params

    const result = await pool.query(
    `
    SELECT p.*,
    a.first_name,
    a.last_name,
    a.business_name,
    pi.image_url,
    pi.alt_text
    FROM products p
    LEFT JOIN product_images pi
    on p.id = pi.product_id
    JOIN artists a
    ON p.artist_id = a.id

    WHERE p.id = $1
    `, [productId]
);

if (result.rows.length === 0) {
    return <p>Product not found</p>
}

    const product = result.rows[0];
    console.log(product);
    
    return (
        <main>
            <h1>{product.name}</h1>
            <h2>by {product.first_name} {product.last_name} of {product.business_name}</h2>
           
            <Image src={`/${product.image_url}`} alt={product.alt_text} width={800} height={1000} className="2-full h-auto max-w-lg" />
            
            <p>{product.description}</p>
            


        </main>
    )

}