"use client";
import Edit from "@/components/svgs/Edit";
import Heart from "@/components/svgs/Heart";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ListInterface } from "@/types/list";
import type { MovieInterface } from "@/types/movie";
import { getMoviesByListId } from "@/helpers/api";
import ListPreviewPosters from "./ListPreviewPosters";

type ListPreviewProps = {
    list: ListInterface;
    isOwner: boolean;
    lastIndex: boolean;
};

export default function ListPreview({
    list,
    isOwner,
    lastIndex,
}: ListPreviewProps) {
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        getMoviesByListId(list.id, 5)
            .then((movies) => {
                setMovies(movies.map((movie) => movie.movie));
            })
            .catch((e) => {
                console.error(e);
                setIsError(true);
            })
            .finally(() => setIsLoading(false));
    }, [list.id]);

    if (isLoading) {
        return <div>loading...</div>;
    }
    if (isError) {
        return <div>Error while loading.</div>;
    }
    return (
        <div
            className={`border border-cyan-100/40 px-2 py-4 ${lastIndex === false ? "border-b-transparent" : ``} `}
        >
            <div className="flex items-center">
                <ListPreviewPosters
                    postersUrls={movies.map((mv) => {
                        return { title: mv.title, path: mv.poster_path };
                    })}
                ></ListPreviewPosters>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                            <Link href={`/list/${list.id}`}>{list.title}</Link>
                        </div>
                        {isOwner && (
                            <Link href={`/list/${list.id}/edit`}>
                                <Edit size={16} color={"#ffffff"}></Edit>
                            </Link>
                        )}
                    </div>
                    <div className="text-xs text-gray-400">
                        <div>{movies.length} movies</div>
                        <div className="flex items-center gap-1">
                            {list.likesCount}{" "}
                            <Heart
                                size={13}
                                fill={"#9ca3af"}
                                color={"none"}
                            ></Heart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
