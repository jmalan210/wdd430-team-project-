import { pool } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import ProductReviews from "@/components/ProductReviews";
import ReviewForm from "@/components/ReviewForm";
import { auth } from "@/auth";



export default async function Page({
    params,
}: {
    params: Promise<{ productId: string }>;
    }) { 
    const session = await auth();
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
    // console.log(product);

    const reviewsResult = await pool.query(
        `
        SELECT
        r.*,
        u.firstname,
        u.lastname
        FROM reviews r
        JOIN users u
        on r.user_id = u.id
        WHERE r.product_id = $1
        ORDER BY r.created_at DESC`,
        [productId]
    );

    const reviews = reviewsResult.rows;
    
    return (
        <main>
            <h1 className="text-center text-3xl">{product.name}</h1>
            <h2 className="text-center text-xl text-terracotta">by {product.first_name} {product.last_name} of {product.business_name}</h2>
            
            <div className="flex flex-col items-center">
                
                <Image src={`/${product.image_url}`} alt={product.alt_text} width={800} height={1000} className="w-full h-auto max-w-lg" />
                <p className="italic">{`$${product.price}`}</p>
                <p>{product.description}</p>

            </div>

            <div>
                
                <ProductReviews reviews={reviews} />
                {session ? (
                    <ReviewForm productId={Number(productId)} />
                ) : (
                        <p className="mt-4">Please log in to leave a review</p>
               )}
                
                
            </div>
            
           
            


        </main>
    )

}