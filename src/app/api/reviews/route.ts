import { getToken } from "next-auth/jwt";
import { pool } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = await getToken({
  req,
  secret: process.env.AUTH_SECRET,
});

    if (!token) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }

    const { productId, rating, reviewText } = await req.json();

    if (rating < 1 || rating > 5) {
        return NextResponse.json(
            { message: "Rating must be between 1 and 5" },
            {status: 400}
        )
    }

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
        where user_id = $1`, [token.id]
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
        [productId, token.id, rating, reviewText]
    );

    return NextResponse.json(
        {
            message: "Review saved"
            
        },
        { status: 201 }
    );
}