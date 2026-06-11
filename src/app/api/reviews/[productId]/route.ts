import { getToken } from "next-auth/jwt";
import { pool } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
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
    const { productId } = await context.params;
    const { rating, reviewText } = await req.json();

    const result = await pool.query(
        `UPDATE reviews
        SET rating = $1,
        review_text = $2
        WHERE product_id= $3
        AND user_id=$4`,
        [rating, reviewText, productId, token.id]
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