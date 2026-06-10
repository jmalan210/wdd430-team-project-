import { auth } from "@/auth";
import ProductReviews from "@/components/ProductReviews";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: {params: {productId: string}}
) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Not authorized" },
            { status: 401 }
        );
    }
    const { productId } = params;
    const { rating, reviewText } = await req.json();

    const result = await pool.query(
        `UPDATE reviews
        SET rating = $1,
        review_text = $2
        WHERE product_id= $3
        AND user_id=$4`,
        [rating, reviewText, productId, session.user.id]
    );

    if (result.rowCount === 0) {
        return NextResponse.json(
            { message: "Review not found" },
            {status: 404}
        )
    }

    return NextResponse.json(
        { message: "Review updated" },
        { status: 200 }
    );
}