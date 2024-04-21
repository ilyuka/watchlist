"use client";
import Image from "next/image";
import Edit from "@/components/svgs/Edit";
import Heart from "@/components/svgs/Heart";
import Link from "next/link";
import { useEffect, useState } from "react";
const axios = require("axios").default;

type ListProps = {
    listId: number;
    isOwner: boolean;
};

const getMoviesByListId = async (listId: number) => {
    try {
        const responseMovies = await axios({
            url:
                process.env.NEXT_PUBLIC_URL +
                `/api/lists/${listId}/movies?limit=5`,
            method: "GET",
        });
        const movies = responseMovies.data.movies;
        if (!movies || responseMovies.status >= 300) {
            return null;
        }
        console.log("MOVIES", movies);
        return movies;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default function ListPreview({ list, isOwner, lastIndex }) {
    const [postersUrls, setPostersUrls] = useState([]);
    useEffect(() => {
        getMoviesByListId(list.id).then((movies) =>
            setPostersUrls((urls) => {
                const posters = movies.map((mv) => {
                    return mv.movie.poster_path;
                });
                console.log("posters", posters);
                return posters;
            }),
        );
    }, [list.id]);

    return (
        <div
            className={`border border-cyan-100/40 px-2 py-4 ${lastIndex === false ? "border-b-transparent" : ``} `}
        >
            <div className="flex items-center">
                <div className="flex">
                    {Array(5)
                        .fill(null)
                        .map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        transform: `translateX(-${index * 15}%)`,
                                        zIndex: `${5 - index}`,
                                        height: "98px",
                                        width: "60px",
                                        backgroundColor: "#1c1c1c",
                                    }}
                                    className="overflow-clip rounded-sm shadow-2xl"
                                >
                                    {index < length && postersUrls[index] ? (
                                        <Image
                                            style={{
                                                height: "100%",
                                            }}
                                            src={`https://image.tmdb.org/t/p/original/${postersUrls[index]}`}
                                            alt={movies[index].title}
                                            height={90}
                                            width={60}
                                        ></Image>
                                    ) : index < length &&
                                      !movies[index].poster_path ? (
                                        <div
                                            className="border border-gray-300/20"
                                            style={{
                                                height: "100%",
                                                backgroundColor: "#1c1c1c",
                                                color: "#cbd5e1",
                                                fontSize: "0.735em",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            <p>{movies[index].title}</p>
                                            <p>
                                                (
                                                {
                                                    movies[
                                                        index
                                                    ].release_date.split("-")[0]
                                                }
                                                )
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="h-full border border-gray-300/10"></div>
                                    )}
                                </div>
                            );
                        })}
                </div>
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
                        <div>{length} movies</div>
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
