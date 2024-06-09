"use client";

import { countMoviesOnList, deleteMovieFromList } from "@/actions/movieOnList";
import Button from "@/components/Utils/Button";
import { NotificationsContext } from "@/components/providers/MyNotificationProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DeleteMovieButton({ list, movie }) {
    const router = useRouter();
    const { notify } = useContext(NotificationsContext);

    const deleteMovie = async (listId: number, movieId: number) => {
        if ((await countMoviesOnList(listId)) === 1) {
            router.back();
            notify("Can't delete last movie");
            return;
        }
        await deleteMovieFromList(listId, movieId);
        router.back();
        notify("Successfully deleted movie");
    };

    return (
        <Button
            handleClick={() => {
                deleteMovie(list.id, movie.id);
            }}
            text={"Delete"}
            bgColorClassname={"bg-gray-100"}
        ></Button>
    );
}
