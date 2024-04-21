import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        if (!username) {
            throw new Error("No username was provided");
        }
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!user || !user.id || !user.username) {
            throw new Error("No user was found");
        }
        return NextResponse.json({
            status: 200,
            message: "User found",
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
