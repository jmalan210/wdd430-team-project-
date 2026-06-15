import { NextResponse } from "next/server";
import { auth } from "@/auth"
import { createProduct } from "@/lib/products";

export async function POST(req: Request) {
    const session = await auth();

    if (!session) { 
        return NextResponse.json(
            { message: "Not authorized" },
            {status: 401}
        )
    }

    if (session.user.role !== "artist") {
        return NextResponse.json(
             { message: "Not authorized" },
            {status: 403}
        )
    }

    try {
        const body = await req.json();

        const product = await createProduct({
            artistId: Number(body.artist_id),
            name: body.name,
            description: body.description,
            price: Number(body.price),
            imageUrl: body.image_url,
        });

        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to create product" }, 
            {status: 500}
        )
    }
}