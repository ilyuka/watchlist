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

export const getMovieLikes = async (userId: number, movieIds: number[]) => {
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

export const addMovieLike = async (userId, movieId) => {
    console.log("ADD MOVIE LIKE RECEIVED", userId, movieId);
    try {
        await prisma.movieLike.create({
            data: {
                userId: userId,
                movieId: movieId,
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
export const removeMovieLike = async (userId, movieId) => {
    try {
        await prisma.movieLike.deleteMany({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

/*

try {
        
    } catch(e) {
        console.log(e);
        throw new Error("Database Error");
    }

*/
