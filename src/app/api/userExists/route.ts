"use server";
import { NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        console.log("RECEIVED USERNAME: ", username);
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    "An error occured while trying to find if the user already exists",
            },
            {
                status: 500,
            },
        );
    }
}
