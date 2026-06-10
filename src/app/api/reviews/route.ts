import { auth } from "@/auth";
import ProductReviews from "@/components/ProductReviews";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }

    const { productId, rating, reviewText } = await req.json();

    if (!reviewText.trim()) {
        return NextResponse.json(
            { message: "Review text is required" },
            { status: 400 }
        );
    }

    const productResult = await pool.query(
        `
        SELECT artist_id 
        FROM products
        WHERE id = $1`, [productId]
    );

    if (productResult.rows.length === 0) {
         return NextResponse.json(
            { message: "Product not found" },
            { status: 404 }
        );
    }
    const product = productResult.rows[0];
    const productArtistId = product.artist_id;
    const artistResult = await pool.query(
        `
        SELECT id
        from artists
        where user_id = $1`, [session.user.id]
    );

    const artist = artistResult.rows[0];

    if (artist && artist.id === productArtistId) {
         return NextResponse.json(
            { message: "You cannot review your own product" },
            { status: 403 }
        );
    }

    await pool.query(
        `INSERT INTO reviews
        ( product_id, user_id, rating, review_text
        )
        VALUES ($1, $2, $3, $4)
        on conflict (product_id, user_id)
        DO UPDATE SET
        rating = EXCLUDED.rating,
        review_text = EXCLUDED.review_text;
        
        `,
        [productId, session.user.id, rating, reviewText]
    );

    return NextResponse.json(
        {
            message: "Review created"
            
        },
        { status: 201 }
    );
}