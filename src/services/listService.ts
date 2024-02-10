"use server";

import { PrismaClient } from "@prisma/client";
import { FieldValues } from "react-hook-form";

const prisma = new PrismaClient();

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
