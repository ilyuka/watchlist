import { NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } },
) {
    try {
        const userId = Number(params.userId);
        if (isNaN(userId)) {
            throw new Error();
        }
        const lists = await prisma.list.findMany({
            orderBy: [
                {
                    createdAt: "asc",
                },
            ],
            where: {
                userId: userId,
            },
        });
        return NextResponse.json({ lists });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                status: 404,
                message: `Failed to fetch List with userId ${params.userId}`,
            },
            { status: 404 },
        );
    }
}
