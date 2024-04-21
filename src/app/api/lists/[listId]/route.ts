import { NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(
    req: Request,
    { params }: { params: { listId: string } },
) {
    try {
        const listId = Number(params.listId);
        if (isNaN(listId)) {
            throw new Error();
        }
        const list = await prisma.list.findFirst({
            where: {
                id: listId,
            },
        });
        return NextResponse.json(list);
    } catch (error) {
        return NextResponse.json(
            {
                status: 404,
                message: `Failed to fetch List with id ${params.listId}`,
            },
            { status: 404 },
        );
    }
}
