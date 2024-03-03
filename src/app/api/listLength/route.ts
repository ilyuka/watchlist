import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const listId = searchParams.get("listId") || "";

        const length = await prisma.movieOnList.count({
            where: {
                listId: Number(listId),
            },
        });

        return NextResponse.json({ length: length });
    } catch (e) {
        console.log(e);
        throw new Error("An error occured while trying to retreive user data");
    }
}
