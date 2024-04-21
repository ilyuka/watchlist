import prisma from "@/../prisma/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { listId: string } },
) {
    try {
        const listId = Number(params.listId);
        const searchParams = req.nextUrl.searchParams;
        const limit = Number(searchParams.get("limit"));
        if (isNaN(listId) || isNaN(limit)) {
            throw new Error();
        }
        const movies = await prisma.movieOnList.findMany({
            where: {
                listId: listId,
            },
            take: limit > 0 ? limit : undefined,
            select: {
                movie: true,
            },
        });
        return NextResponse.json({ movies });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 400,
                message: `Failed to fetch movies for list with id ${params.listId}`,
            },
            { status: 404 },
        );
    }
}
