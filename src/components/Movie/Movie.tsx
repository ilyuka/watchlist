"use client";
import Image from "next/image";
import Heart from "../svgs/Heart";
import Eye from "../svgs/Eye";
import DotsHorizontal from "../svgs/DotsHorizontal";
import { useState, createContext } from "react";
import MoreOptions from "./MoreOptions";
import { addMovieLike, removeMovieLike } from "@/services/movieService";
import { addToWatchlist, removeFromWatchlist } from "@/services/listService";

export const MovieContext = createContext(null);

export default function Movie({
    authed,
    movie,
    isLiked,
    inWatchlist_,
    watchlistId,
    userId,
    movieId,
    listId,
    listOwner,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [liked, setLiked] = useState(isLiked);
    const [inWatchlist, setInWatchlist] = useState(inWatchlist_);

    const toggleInWatchlist = async () => {
        const newInWatchlist = !inWatchlist;
        setInWatchlist(newInWatchlist);
        if (newInWatchlist === true) {
            await addToWatchlist(watchlistId, movieId);
        } else {
            await removeFromWatchlist(watchlistId, movieId);
        }
    };

    const toggleLike = async () => {
        const newLiked = !liked;
        setLiked(newLiked);
        if (newLiked === true) {
            await addMovieLike(Number(userId), Number(movieId));
        } else {
            await removeMovieLike(Number(userId), Number(movieId));
        }
    };
    const showMoreOptions = () => {
        setShowOptions(true);
    };
    const hideMoreOptions = () => {
        setShowOptions(false);
    };

    const SVG_FILL_COLOR = "#ecfeff";

    return (
        <MovieContext.Provider
            value={{
                listOwner,
                liked,
                listId,
                movie,
                movieId,
                userId,
                hideMoreOptions,
            }}
        >
            <div
                className="movie-poster relative flex flex-col items-center rounded-sm"
                style={{
                    height: "187px",
                    width: "125px",
                }}
            >
                {movie.movie.poster_path == null ? (
                    <div
                        style={{
                            height: "187px",
                            width: "125px",
                            background: "#1c1c1ccc",
                            display: "grid",
                            placeItems: "center",
                            border: "1px solid #71717aaa",
                            color: "#d1d5db",
                        }}
                    >
                        <div className="text-center">
                            <p>{movie.movie.title}</p>
                            <p>({movie.movie.release_date.split("-")[0]})</p>
                        </div>
                    </div>
                ) : (
                    <Image
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "fill",
                        }}
                        src={`https://image.tmdb.org/t/p/original/${movie.movie.poster_path}`}
                        alt={movie.movie.title}
                        height={187}
                        width={125}
                    ></Image>
                )}
                {authed && (
                    <ul className="options">
                        <li>
                            <button title="Add to liked" onClick={toggleLike}>
                                <Heart
                                    size={22}
                                    fill={liked ? "orange" : SVG_FILL_COLOR}
                                    color={"none"}
                                ></Heart>
                            </button>
                        </li>

                        <li>
                            <button
                                title="Add to watchlist"
                                onClick={toggleInWatchlist}
                            >
                                <Eye
                                    size={22}
                                    fill={"none"}
                                    color={
                                        inWatchlist ? "skyblue" : SVG_FILL_COLOR
                                    }
                                ></Eye>
                            </button>
                        </li>
                        <li>
                            <button
                                title="More options"
                                onClick={showMoreOptions}
                            >
                                <DotsHorizontal
                                    size={24}
                                    fill={"none"}
                                    color={SVG_FILL_COLOR}
                                ></DotsHorizontal>
                            </button>
                        </li>
                    </ul>
                )}
                {showOptions && (
                    <MoreOptions
                        toggleLike={toggleLike}
                        toggleInWatchlist={toggleInWatchlist}
                        inWatchlist={inWatchlist}
                    ></MoreOptions>
                )}
            </div>
        </MovieContext.Provider>
    );
}
