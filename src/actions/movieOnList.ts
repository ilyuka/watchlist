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

export const addMovieToList = async (listId: number, movieId: number) => {
    try {
        const creation = prisma.movieOnList.create({
            data: {
                listId: listId,
                movieId: movieId,
            },
        });
        return creation;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const deleteMovieFromList = async (
    listId: number,
    movieId: number,
    positionOnTheList: number,
) => {
    try {
        prisma.movieOnList.delete({
            where: {
                listId_movieId_positionOnTheList: {
                    listId: listId,
                    movieId: movieId,
                    positionOnTheList: positionOnTheList,
                },
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
