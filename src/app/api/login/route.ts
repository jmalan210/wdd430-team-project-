import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import next from "next";
import { getUserByEmail } from "@/lib/users";


export async function login(email: string, password: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const valid = await bcrypt.compare(
        password, user.passwordHash
    );

    if (!valid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }
}