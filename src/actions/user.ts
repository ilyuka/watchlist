"use server";
import prisma from "@/../prisma/prisma";

export const getUserByUsername = async (username: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        return user;
    } catch (e) {
        console.log(e);
        throw new Error("Database error");
    }
};

export const getUserDataForListsPreviews = async (username: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
            include: {
                lists: {
                    // Include the related lists
                    orderBy: [
                        {
                            createdAt: "asc",
                        },
                    ],
                    include: {
                        movies: {
                            include: {
                                movie: {
                                    select: {
                                        release_date: true,
                                        poster_path: true,
                                        title: true,
                                    },
                                },
                            },
                            take: 5,
                        },
                    },
                },
            },
        });
        return user; // Return the user object with the lists included
    } catch (e) {
        console.log(e);
        throw new Error("Database error");
    }
};
