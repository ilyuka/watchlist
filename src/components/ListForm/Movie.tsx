import Image from "next/image";
import X from "../svgs/X";

import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function Movie({ movies, movie, deleteMovie, index }) {
    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            transitionDuration: `0.15s`,
        };
    }
    return (
        <Draggable draggableId={index.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                    className={`flex items-center justify-between border border-cyan-300/80 ${snapshot.isDragging ? `border-b-cyan-300/80 bg-gray-600` : `bg-gray-800`} ${index === movies.length - 1 ? "" : "border-b-transparent"}`}
                >
                    <div className="flex items-center gap-2  p-1">
                        <div className="">{index + 1}</div>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                            width={50}
                            height={75}
                            className="text-sm italic"
                        ></Image>
                        <div className="text-lg font-bold">{movie.title}</div>
                        <div className="font-light">
                            ({movie.release_date.split("-")[0]})
                        </div>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <button
                            onClick={(e) => {
                                deleteMovie(movie.id);
                            }}
                        >
                            <X size={30} color="#ccfbf1" />
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
