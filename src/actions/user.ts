"use server";

import prisma from "@/../prisma/prisma";

export const getUserByUsername = async (userId: number) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return user;
    } catch (e) {
        console.log(e);
        throw new Error("Database error");
    }
};
