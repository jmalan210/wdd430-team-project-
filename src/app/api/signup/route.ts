import { NextRequest,NextResponse } from "next/server";
import { createUser } from "@/lib/users";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    console.log("Signup Route Hit");

    const formData = await req.formData();

    
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword")
    
    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing fields" },
            {status: 400}
        )
    }

    if (password !== confirmPassword) {
        return NextResponse.json({
            message: "Passwords do not match"
        },
            { status: 400 });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        await createUser(email, passwordHash);
        return NextResponse.json({ message: "User created successfully!" });

    } catch (err: any) {
        if (err.code === "23505") {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }
        console.error(err);
        return NextResponse.json(
            { error: "Signup failed" },
            {status: 500}
        )
    }
    

  
}