import prisma from "@/../prisma/prisma";

export const getListById = async (number: number | string) => {
    try {
        const listId = Number(number);
        if (isNaN(listId)) {
            throw new Error("Database Error when fetching list by id");
        }
        const list = await prisma.list.findFirst({
            where: {
                id: listId,
            },
        });
        return list;
    } catch (e) {
        console.error(e);
        throw new Error("Database Error when fetching list by id");
    }
};
