
import ProductEditForm from "@/components/ProductEditForm";
import { auth } from "@/auth";
import { pool } from "@/lib/db";


export default async function Page({
    params,
}: {
    params: Promise<{ productId: string }>;
}) {
    

    const session = await auth();

    if (!session) {
        return <p>Not Authorized</p>
    }

    if (session.user.role !== "artist") {
        return <p className="text-center text-2xl">Not Authorized</p>;
    }

    
    const { productId } = await params;

   

    const result = await pool.query(
        `
        SELECT p.*
        FROM products p
        JOIN artists a
        on p.artist_id = a.id
        WHERE p.id=$1
        and a.user_id = $2`,
        [productId, session.user.id]
    );

    if (result.rows.length === 0) {
        return <p>Product not found</p>
    }
    const product = result.rows[0];
    return <ProductEditForm product={product} />
}