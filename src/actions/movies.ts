"use server";
import prisma from "@/../prisma/prisma";

export const getAllMoviesFromList = async (listId) => {
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

export const getMoviesLikes = async (userId: number, movieIds: number[]) => {
    try {
        const likes = await prisma.movieLike.findMany({
            where: {
                userId: userId,
                movieId: {
                    in: movieIds,
                },
            },
            select: {
                movieId: true,
            },
        });
        return likes;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
