"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
    try {
        console.log("here");
        const { username } = await req.json();

        const prisma = new PrismaClient();
        console.log("RECEIVED USERNAME: ", username);
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        console.log("db user exists", user);
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
