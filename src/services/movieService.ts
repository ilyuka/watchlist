"use server";

import prisma from "@/../prisma/prisma";

export const firstFiveMoviesFromList = async (listId) => {
    try {
        const movies = await prisma.movieOnList.findMany({
            where: {
                listId: listId,
            },
            take: 5, // limit to 5 records
            orderBy: {
                id: "asc",
            },
            include: {
                movie: true,
            },
        });
        return movies;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const allMoviesFromList = async (listId) => {
    try {
        const movies = prisma.movieOnList.findMany({
            where: {
                listId: listId,
            },
            include: {
                movie: true,
            },
        });
        return movies;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
