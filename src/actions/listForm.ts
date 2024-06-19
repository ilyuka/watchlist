"use server";

import prisma from "@/../prisma/prisma";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

const createList = async (data: FieldValues, user, movies) => {
    try {
        if (
            !data.title ||
            (!user.id && user.id !== 0) ||
            !user.username ||
            movies.length === 0
        ) {
            return "Something went wrong.";
        }

        const transaction = await prisma.$transaction(async () => {
            const newList = await prisma.list.create({
                data: {
                    userId: user.id,
                    title: data.title,
                    description: data.description,
                },
            });

            // Add the new movies to the list
            for (let i = 0; i < movies.length; i += 1) {
                const movieId = movies[i].tmdbId;
                const movieInDatabase = await prisma.movie.findFirst({
                    where: {
                        tmdbId: movieId,
                    },
                });
                if (!movieInDatabase) {
                    const movie = await prisma.movie.create({
                        data: {
                            tmdbId: movies[i].tmdbId,
                            title: movies[i].title,
                            release_date: movies[i].release_date,
                            poster_path: movies[i].poster_path,
                            backdrop_path: movies[i].backdrop_path,
                            original_title: movies[i].original_title,
                            overview: movies[i].overview,
                            original_language: movies[i].original_language,
                        },
                    });

                    const newMovieOnList = await prisma.movieOnList.create({
                        data: {
                            listId: newList.id,
                            movieId: movie.id,
                            positionOnTheList: i,
                        },
                    });
                } else {
                    const newMovieOnList = await prisma.movieOnList.create({
                        data: {
                            listId: newList.id,
                            movieId: movieInDatabase.id,
                            positionOnTheList: i,
                        },
                    });
                }
            }
            revalidatePath("/");
            return { status: 200 };
        });
        return transaction;
    } catch (e) {
        console.log(e);
        return { status: 400 };
    }
};

const updateList = async (data: FieldValues, user, movies, listId) => {
    try {
        if (
            !data.title ||
            (!user.id && user.id !== 0) ||
            !user.username ||
            movies.length === 0 ||
            !listId
        ) {
            return "Something went wrong.";
        }
        const transaction = await prisma.$transaction(async () => {
            // Update the list
            await prisma.list.update({
                where: {
                    id: listId,
                },
                data: {
                    title: data.title,
                    description: data.description,
                },
            });

            // Delete all movies from the list
            await prisma.movieOnList.deleteMany({
                where: {
                    listId: listId,
                },
            });

            // Add the new movies to the list
            for (let i = 0; i < movies.length; i += 1) {
                const movieId = movies[i].tmdbId;
                const movieInDatabase = await prisma.movie.findFirst({
                    where: {
                        tmdbId: movieId,
                    },
                });
                if (!movieInDatabase) {
                    const movie = await prisma.movie.create({
                        data: {
                            tmdbId: movies[i].tmdbId,
                            title: movies[i].title,
                            release_date: movies[i].release_date,
                            poster_path: movies[i].poster_path,
                            backdrop_path: movies[i].backdrop_path,
                            original_title: movies[i].original_title,
                            overview: movies[i].overview,
                            original_language: movies[i].original_language,
                        },
                    });

                    const newMovieOnList = await prisma.movieOnList.create({
                        data: {
                            listId: listId,
                            movieId: movie.id,
                            positionOnTheList: i,
                        },
                    });
                } else {
                    const newMovieOnList = await prisma.movieOnList.create({
                        data: {
                            listId: listId,
                            movieId: movieInDatabase.id,
                            positionOnTheList: i,
                        },
                    });
                }
            }

            revalidatePath("/");
            return { status: 200 };
        });
        return transaction;
    } catch (e) {
        console.error(e);
        return { status: 500 };
    }
};

export { createList, updateList };
