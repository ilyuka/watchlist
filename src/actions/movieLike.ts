"use server";
import prisma from "@/../prisma/prisma";

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
