import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: Request, res: Response) {
    try {
        console.log("TRIED");
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username") || "";

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (user) {
            return NextResponse.json({ status: 200, message: "User found" });
        } else {
            return NextResponse.json({
                status: 404,
                message: "No user",
            });
        }
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
