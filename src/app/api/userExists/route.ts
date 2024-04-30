import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function POST(req: Request, res: Response) {
    try {
        const payload = await req.json();
        const username = payload.username.trim().toLowerCase();

        if (!username) {
            throw new Error("No username was provided");
        }
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user || !user.id || !user.username) {
            return NextResponse.json({
                status: 200,
                message: "User Not Found",
                found: false,
            });
        }

        return NextResponse.json({
            status: 200,
            message: "User found",
            found: true,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 404,
                message:
                    "An error occured while trying to find if the user already exists",
            },
            { status: 404 },
        );
    }
}
