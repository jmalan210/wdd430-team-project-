import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );

        }

      

        const filename = `${Date.now()}-${file.name}`;
        const blob = await put(filename, file, {
            access: "public",

            
        });

        return NextResponse.json({
            url: blob.url
        });
    }
    catch(err) {
        return NextResponse.json(
            { message: "Upload failed" },
            { status: 500 }
        );
    }
}