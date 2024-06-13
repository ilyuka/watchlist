"use client";

import { useState, useRef } from "react";
import { MaterialSymbolsFitbitCheckSmallSharp } from "../svgs/CheckSmallSharp";

export default function ModalList({ list, setSelectedLists }) {
    const isSelectedRef = useRef(false);
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div
            className={`flex items-center border-t border-t-slate-700 px-4 py-2 ${isSelected ? "bg-slate-700" : ""}`}
        >
            <MaterialSymbolsFitbitCheckSmallSharp
                width={"30"}
                height={"30"}
                className={`mr-4 ${isSelected ? "text-green-400" : "text-transparent"}`}
            ></MaterialSymbolsFitbitCheckSmallSharp>
            <button
                className={
                    isSelected ? "text-white" : "text-gray-300 hover:text-white"
                }
                onClick={() => {
                    isSelectedRef.current = !isSelectedRef.current;
                    setIsSelected((isSlctd) => !isSlctd);
                    setSelectedLists((cur) => {
                        return {
                            ...cur,
                            [list.id]: {
                                selected: isSelectedRef.current,
                                title: list.title,
                            },
                        };
                    });
                }}
            >
                {list.title}
            </button>
            <span className="ml-auto text-sm text-gray-400">
                {list._count.movies} movies
            </span>
        </div>
    );
}
