"use server";
import prisma from "@/../prisma/prisma";

export const getWatchlistMovies = async (watchlistId) => {
    try {
        const watchlistMovies = await prisma.movieOnList.findMany({
            where: {
                listId: watchlistId,
            },
            include: {
                movie: true,
            },
        });
        return watchlistMovies;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
