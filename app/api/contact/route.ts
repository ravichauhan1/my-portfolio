// app/api/contact/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/database";
import { createContact } from "@/lib/controllers/contact.controllers";


export async function POST(request: Request) {
    try {
        await dbConnect();
        const formData = await request.formData();

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
        };

        const contact = await createContact(data);

        return NextResponse.json(
            { message: "Contact form submitted successfully.", contact },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong." },
            { status: 400 }
        );
    }
}
