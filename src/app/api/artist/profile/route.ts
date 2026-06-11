import ArtistsPage from "@/app/artists/page";
import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    if (session.user.role !== "artist") {
        return NextResponse.json({ message: "Not Authorized" });
    }

    const { bio, medium, businessName } = await req.json();

    await pool.query(
        `
        update artists
        set bio = $1, 
        medium = $2, 
        business_name = $3
        where user_id = $4
        `,
        [bio, medium, businessName, session.user.id]
    );

    return NextResponse.json({ message: "Profile updated" });
}