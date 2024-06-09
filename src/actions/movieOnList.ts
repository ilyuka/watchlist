"use server";
import prisma from "@/../prisma/prisma";
import { revalidatePath } from "next/cache";

export const getAllMoviesFromList = async (listId) => {
    try {
        const movies = await prisma.movieOnList.findMany({
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
        const creation = await prisma.movieOnList.create({
            data: {
                listId: listId,
                movieId: movieId,
            },
        });
        revalidatePath("/");
        return creation;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const deleteMovieFromList = async (listId: number, movieId: number) => {
    try {
        await prisma.movieOnList.deleteMany({
            where: {
                listId: listId,
                movieId: movieId,
            },
        });
        revalidatePath("/");
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
