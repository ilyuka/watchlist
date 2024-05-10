"use server";
import prisma from "@/../prisma/prisma";

export const getListByListId = async (listId: number) => {
    try {
        const list = await prisma.list.findFirst({
            where: {
                id: listId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        watchlistId: true,
                    },
                },
            },
        });
        return list;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
