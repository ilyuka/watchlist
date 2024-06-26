"use client";

import { useState, useContext } from "react";
import ModalList from "./ModalList";
import ModalListDisabled from "./ModalListDisabled";
import { addMovieToLists } from "@/actions/movieOnList";
import { NotificationsContext } from "../providers/MyNotificationProvider";
import { useRouter } from "next/navigation";

export default function ModalLists({ movieId, lists }) {
    const { notify } = useContext(NotificationsContext);
    const router = useRouter();
    const [selectedLists, setSelectedLists] = useState({});

    const selectedListsCount = Object.keys(selectedLists).reduce(
        (prev, curr) => {
            return selectedLists[curr].selected ? prev + 1 : prev;
        },
        0,
    );

    const addMovie = async () => {
        await addMovieToLists(
            movieId,
            Object.keys(selectedLists).map((key) => {
                if (selectedLists[key].selected) {
                    return Number(key);
                }
            }),
        );
        router.back();
        notify(
            `Added movie to lists: ${Object.keys(selectedLists).map((key) =>
                selectedLists[key].selected
                    ? ` <a class="underline" href=/list/${key}>${selectedLists[key].title}</a>`
                    : ``,
            )}`,
        );
    };

    return (
        <div>
            <div className="mb-2">
                {lists.map((list) => {
                    if (!list.isWatchlist && list.movies.length > 0) {
                        return (
                            <ModalListDisabled
                                key={list.id}
                                list={list}
                            ></ModalListDisabled>
                        );
                    }
                    return (
                        !list.isWatchlist && (
                            <ModalList
                                key={list.id}
                                list={list}
                                setSelectedLists={setSelectedLists}
                            ></ModalList>
                        )
                    );
                })}
            </div>

            <div className="flex justify-between bg-slate-700 px-10 py-4">
                <div>
                    {selectedListsCount > 0
                        ? `${selectedListsCount} selected`
                        : ""}
                </div>
                <button
                    onClick={(e) => {
                        addMovie();
                    }}
                    className=""
                    disabled={selectedListsCount < 1}
                >
                    done
                </button>
            </div>
        </div>
    );
}
