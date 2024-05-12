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

export const isMovieInWatchlist = async (movieId, watchlistId) => {
    try {
        const movieOnList = await prisma.movieOnList.findFirst({
            where: {
                listId: Number(watchlistId),
                movieId: Number(movieId),
            },
        });

        if (!movieOnList) {
            return false;
        }
        return true;
    } catch (e) {
        console.error(e);
    }
};
