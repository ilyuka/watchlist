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
