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

export const createList = async (data: FieldValues) => {
    try {
        const newList = await prisma.list.create({
            data: {
                title: data.title,
                description: data.description,
            },
        });
        console.log("Successfully added new list: ", newList);
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
