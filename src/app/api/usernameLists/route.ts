import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        const withWatchlist = !!searchParams.get("withWatchlist");
        if (!username || withWatchlist == undefined) {
            throw new Error("One of required parameters missing");
        }
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            throw new Error("No user");
        }
        const lists = await prisma.list.findMany({
            where: {
                AND: [
                    { userId: user.id },
                    withWatchlist ? {} : { isWatchlist: false },
                ],
            },
        });
        return NextResponse.json({ status: 200, lists: lists });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Failed to fetch user lists",
        });
    }
}
