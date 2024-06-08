"use server";
import prisma from "@/../prisma/prisma";

export const getWatchlistMovies = async (watchlistId) => {
    try {
        const watchlistMovies = await prisma.movieOnList.findMany({
            where: {
                listId: watchlistId,
            },
            include: {
                movie: {
                    select: {
                        tmdbId: true,
                    },
                },
            },
        });
        return watchlistMovies;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const getWatchlistIntersectListMovies = async (
    watchlistId: number,
    listId: number,
) => {
    try {
        const result = await prisma.$queryRaw`
            SELECT m."tmdbId"
            FROM "MovieOnList" mol
            INNER JOIN "Movie" m ON mol."movieId" = m."id"
            WHERE mol."listId" = ${watchlistId}
            INTERSECT
            SELECT m."tmdbId"
            FROM "MovieOnList" mol2
            INNER JOIN "Movie" m ON mol2."movieId" = m."id"
            WHERE mol2."listId" = ${listId};
        `;

        return result.map((mv) => mv.tmdbId);
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
