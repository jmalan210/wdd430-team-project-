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