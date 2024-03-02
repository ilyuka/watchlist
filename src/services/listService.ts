"use server";

import prisma from "@/../prisma/prisma";
import { FieldValues } from "react-hook-form";

export const getAllLists = async () => {
    try {
        const allLists = await prisma.list.findMany();
        return allLists;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const createList = async (data: FieldValues, user, movies) => {
    try {
        console.log(data, user, movies);
        if (
            !data.title ||
            (!user.id && user.id !== 0) ||
            !user.username ||
            movies.length === 0
        ) {
            return "Something went wrong.";
        }
        const newList = await prisma.list.create({
            data: {
                userId: user.id,
                title: data.title,
                description: data.description,
            },
        });
        console.log("Successfully added new list: ", newList);

        for (let i = 0; i < movies.length; i += 1) {
            const movieId = movies[i].id;
            const movieInDatabase = await prisma.movie.findFirst({
                where: {
                    tmdbId: movieId,
                },
            });
            if (!movieInDatabase) {
                const movie = await prisma.movie.create({
                    data: {
                        tmdbId: movies[i].id,
                        title: movies[i].title,
                        releaseDate: movies[i].release_date,
                        posterPath: movies[i].poster_path,
                        backdropPath: movies[i].backdrop_path,
                        originalTitle: movies[i].original_title,
                        overview: movies[i].overview,
                        originalLanguage: movies[i].original_language,
                    },
                });
                console.log("added new movie");
            }
            console.log("new list id", newList.id);
            const newMovieOnList = await prisma.movieOnList.create({
                data: {
                    listId: newList.id,
                    movieId: movieId,
                },
            });
        }
        return newList;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const getListsByUsername = async (userId: number) => {
    try {
        const listsByUsername = await prisma.list.findMany({
            where: {
                userId: userId,
            },
        });
        console.log("LISTS OF USER:", listsByUsername);
        return listsByUsername;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error");
    }
};

export const getListByListId = async (listId: number) => {
    try {
        const list = await prisma.list.findFirst({
            where: {
                id: listId,
            },
        });
        return list;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const countMoviesOnList = async (listId: number) => {
    try {
        const count = await prisma.movieOnList.count({
            where: {
                listId: listId,
            },
        });
        return count;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

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

export const getWatchlistIdByUserId = async (userId) => {
    try {
        const watchlistId = await prisma.list.findFirst({
            where: {
                userId: userId,
            },
            select: {
                id: true,
            },
        });
        return watchlistId;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const addToWatchlist = async (watchlistId, movieId) => {
    try {
        await prisma.movieOnList.create({
            data: {
                listId: watchlistId,
                movieId: movieId,
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
export const removeFromWatchlist = async (watchlistId, movieId) => {
    console.log("RECEIVED", watchlistId, movieId);

    try {
        await prisma.movieOnList.deleteMany({
            where: {
                listId: watchlistId,
                movieId: movieId,
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
