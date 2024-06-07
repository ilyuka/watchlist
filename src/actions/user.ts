"use server";

import prisma from "@/../prisma/prisma";

export const getUserByUsername = async (username: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            },
        });
        return user;
    } catch (e) {
        console.log(e);
        throw new Error("Database error");
    }
};
