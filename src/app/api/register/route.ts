"use server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/../prisma/prisma";

export async function POST(req: Request) {
    try {
        const { username, password1, password2 } = await req.json();

        const hashedPassword = await bcrypt.hash(password1, 1);

        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User registered!" },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "An error occured while registering the user",
            },
            {
                status: 500,
            },
        );
    }
}
