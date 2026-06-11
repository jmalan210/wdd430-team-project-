import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const result = await loginUser(email, password);

    if (!result.success) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }
    return NextResponse.json({ success: true });
}


