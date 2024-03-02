import Image from "next/image";
import { MoviesContext } from "@/app/list/create/page";
import { useContext } from "react";

export type Results = {
    results: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }[];
    handleClick: Function;
};

export default function SearchFieldResults({ results, handleClick }: Results) {
    const { movies, addMovie } = useContext(MoviesContext);
    return (
        <div className="z-10 max-h-60 max-w-80 overflow-y-auto border border-cyan-100 bg-cyan-950/40 text-white">
            {results.map((movie) => (
                <button
                    key={movie.id}
                    className=" flex w-full cursor-pointer items-center gap-4 border-b border-b-cyan-100 p-1 pr-2 hover:bg-cyan-700"
                    style={{ minHeight: "75px" }}
                    onClick={(e) => {
                        addMovie(e, movie);
                    }}
                    type="button"
                >
                    <div
                        style={{
                            minWidth: "50px",
                            height: "75px",
                            maxHeight: "100%",
                        }}
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                            width={50}
                            height={75}
                            className="text-sm italic"
                        ></Image>
                    </div>
                    <div className="text-left text-sm leading-relaxed">
                        <span>{movie.title}</span>{" "}
                        <span>({movie.release_date.split("-")[0]})</span>{" "}
                    </div>
                </button>
            ))}
        </div>
    );
}
