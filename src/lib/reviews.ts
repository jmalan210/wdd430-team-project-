import { pool } from "./db";
export async function getProductReviews(productId: number) {
    const result = await pool.query(
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
    return result.rows
}

export async function getUserReview(
    productId: number, userId?: string
) {
    if (!userId) return null;

     const result = await pool.query(
        `
        SELECT * 
        FROM reviews
        WHERE product_id = $1
        AND user_id = $2`,
        [productId, userId]
    );
    return result.rows[0] ?? null;
}