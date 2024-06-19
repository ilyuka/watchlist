import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId") || "";
        const movieId = searchParams.get("movieId") || "";
        const lists = await prisma.list.findMany({
            where: {
                userId: Number(userId),
                isWatchlist: false,
            },
            select: {
                id: true,
                title: true,
                movies: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const shortenedLists = lists.map((list, index) => {
            return {
                id: list.id,
                title: list.title,
                hasMovie: list.movies.find(
                    (mv) => mv.tmdbId === Number(movieId),
                )
                    ? true
                    : false,
                length: list.movies.length,
            };
        });

        return NextResponse.json({
            status: 200,
            message: "Temp message",
            userLists: shortenedLists,
        });
    } catch (e) {
        console.log(e);
        throw new Error("An error occured while trying to retreive user data");
    }
}
