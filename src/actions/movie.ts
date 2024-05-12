"use server";
import prisma from "@/../prisma/prisma";

export const getMovieByTmdbId = async (tmdbIdParam) => {
    try {
        const tmdbId = Number(tmdbIdParam);
        const movie = await prisma.movie.findFirst({
            where: {
                tmdbId: tmdbId,
            },
        });
        if (!movie) {
            return { error: true, message: "Movie not found" };
        }
        return { error: false, movie: movie };
    } catch (e) {
        return { error: true, message: "Database Error" };
    }
};

export const addMovieToDb = async (movie) => {
    try {
        const newMovie = await prisma.movie.create({
            data: {
                tmdbId: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                original_title: movie.original_title,
                overview: movie.overview,
                original_language: movie.original_language,
            },
        });
        console.log("new movie in db", newMovie);
        return { error: false, message: "Successfully added movie to the db" };
    } catch (e) {
        console.error(e);
        return {
            error: true,
            message: "Database Error while adding movie to db",
        };
    }
};
