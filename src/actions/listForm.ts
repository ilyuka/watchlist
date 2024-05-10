"use server";

import prisma from "@/../prisma/prisma";
import { FieldValues } from "react-hook-form";

const createList = async (data: FieldValues, user, movies) => {
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
                        release_date: movies[i].release_date,
                        poster_path: movies[i].poster_path,
                        backdrop_path: movies[i].backdrop_path,
                        original_title: movies[i].original_title,
                        overview: movies[i].overview,
                        original_language: movies[i].original_language,
                    },
                });
                console.log("added new movie");
            }
            console.log("new list id", newList.id);
            const newMovieOnList = await prisma.movieOnList.create({
                data: {
                    listId: newList.id,
                    movieId: movieId,
                    positionOnTheList: i,
                },
            });
        }
        return newList;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export { createList };
