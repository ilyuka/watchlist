"use server";
import prisma from "@/../prisma/prisma";
import { revalidatePath } from "next/cache";

export const getListByListId = async (listId: number) => {
    try {
        const list = await prisma.list.findFirst({
            where: {
                id: listId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        watchlistId: true,
                    },
                },
            },
        });
        return list;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const deleteListByListId = async (listId: number) => {
    try {
        await prisma.list.delete({
            where: {
                id: listId,
            },
        });
        revalidatePath("/");
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const getAllUserLists = async (userId: number) => {
    if (!userId) {
        return null;
    }
    try {
        const res = await prisma.list.findMany({
            where: {
                userId: userId,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};

export const getAllUserListsAndMoviesFromList = async (
    userId: number,
    movieId: number,
) => {
    if (!userId) {
        return null;
    }
    try {
        const res = await prisma.list.findMany({
            where: {
                userId: userId,
            },
            include: {
                movies: {
                    where: {
                        movieId: movieId,
                    },
                    take: 1,
                },

                _count: {
                    select: { movies: true },
                },
            },
        });

        return res;
    } catch (e) {
        console.log(e);
        throw new Error("Database Error");
    }
};
