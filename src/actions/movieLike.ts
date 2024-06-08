"use server";
import prisma from "@/../prisma/prisma";

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

export const isMovieLiked = async (movieId, userId) => {
    try {
        const like = await prisma.movieLike.findFirst({
            where: {
                userId: Number(userId),
                movieId: Number(movieId),
            },
        });
        if (!like) {
            return false;
        }
        return true;
    } catch (e) {
        console.error(e);
    }
};

export const addMovieLike = async (userId, movieId) => {
    console.log("recieved", userId, movieId);
    try {
        const like = await prisma.movieLike.create({
            data: {
                userId: userId,
                movieId: movieId,
            },
        });
        if (!like) {
            throw new Error("Database Error");
        }
        return like;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const removeMovieLike = async (userId, movieId) => {
    try {
        const removal = await prisma.movieLike.delete({
            where: {
                userId_movieId: {
                    userId: Number(userId),
                    movieId: Number(movieId),
                },
            },
        });
        console.log("removal", removal);
    } catch (e) {
        console.error(e);
    }
};
