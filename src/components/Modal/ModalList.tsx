"use client";
/*
id: 7,
    isWatchlist: false,
    userId: 1,
    title: 'ddddd',
    description: '1231245',
    likesCount: 0,
    createdAt: 2024-06-08T13:46:19.652Z,
    updatedAt: 2024-06-09T05:25:22.194Z,
    movies: [],
    _count: { movies: 1 }

*/
import { useRef } from "react";

export default function ModalList({ list, setSelectedLists }) {
    const isSelectedRef = useRef(false);
    return (
        <div>
            <input
                type="checkbox"
                name="selected"
                id="selected"
                onChange={(e) => {
                    isSelectedRef.current = !isSelectedRef.current;
                    setSelectedLists((cur) => {
                        return { ...cur, [list.id]: isSelectedRef.current };
                    });
                }}
            />
            {list.title}
            {isSelectedRef.current ? "V" : "X"}
            {list._count.movies} movies
        </div>
    );
}
