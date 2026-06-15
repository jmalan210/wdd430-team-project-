
import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ productId: string }>} ){
    const { productId } = await params
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    if (session.user.role !== "artist") {
        return NextResponse.json({ message: "Unauthorized" });
    }

    const artistResult = await pool.query(
        `SELECT id FROM artists where user_id = $1`, [session.user.id]
    );

    const artistId = artistResult.rows[0].id;

    const productResult = await pool.query(
        `SELECT id from products WHERE id = $1 and artist_id = $2`, [productId, artistId]
    );

    if (productResult.rows.length === 0) {
        return NextResponse.json(
            { message: "You do not own this product" },
            { status: 403 }
        );
    }

    const { name, description, price, image_url } = await req.json();
    console.log("image_url received:", image_url);

    await pool.query(
        `
        update products
        set name = $1, 
        description = $2,
        price = $3
        
        where id = $4
        `,
        [name, description, price, productId]
    );

    if (image_url) {
        await pool.query(
            `UPDATE product_images
        SET image_url = $1
        WHERE product_id = $2`, [image_url, productId]
        );
    }

    return NextResponse.json({ message: "Product updated" });
}

export async function DELETE(
    req: NextRequest,
    { params }: {params: Promise<{productId: string}>}
) {
    const { productId } = await params;
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }

    if (session.user.role !== "artist") {
         return NextResponse.json(
            { message: "Not Authorized" },
            { status: 403 }
        );
    }

    const artistResult = await pool.query(
        `SELECT id FROM artists where user_id = $1`, [session.user.id]
    );

    const artistId = artistResult.rows[0].id;

    const productResult = await pool.query(
        `SELECT id from products WHERE id = $1 and artist_id = $2`, [productId, artistId]
    );

    if (productResult.rows.length === 0) {
        return NextResponse.json(
            { message: "You do not own this product" },
            { status: 403 }
        );
    }

    await pool.query(
        `DELETE FROM product_images where product_id = $1`, [productId]
    );

    await pool.query(
        `DELETE FROM products where id = $1`, [productId]
    );

    return NextResponse.json({
        message: "Product Deleted"
    });
}