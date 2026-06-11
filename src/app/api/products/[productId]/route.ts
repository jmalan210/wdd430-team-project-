
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

    const { name, description } = await req.json();

    await pool.query(
        `
        update products
        set name = $1, 
        description = $2 
        
        where id = $3
        `,
        [name, description, productId]
    );

    return NextResponse.json({ message: "Product updated" });
}