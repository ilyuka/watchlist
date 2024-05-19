"use client";
import Heart from "../svgs/Heart";
import Eye from "../svgs/Eye";
import DotsHorizontal from "../svgs/DotsHorizontal";
import { useState, createContext, useTransition } from "react";
import MoreOptions from "./MoreOptions";
// import { addMovieLike, removeMovieLike } from "@/services/movieService";
import { addToWatchlist, removeFromWatchlist } from "@/services/listService";
import Poster from "../Lists/Poster";
import MainOptions from "./MainOptions";
import LikeButton from "../ActionButtons/LikeButton";
import { addMovieLike, removeMovieLike } from "@/actions/movieLike";

export const MovieContext = createContext(null);

export default function Movie({
    user,
    movie,
    isLiked,
    inWatchlist,
    width,
    height,
    listId = -1,
    listOwner = null,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [liked, setLiked] = useState(isLiked);
    const [isPending, startTransition] = useTransition();
    const [inWatchlistState, setInWatchlistState] = useState(inWatchlist);

    // const toggleInWatchlist = async () => {
    //     const newInWatchlist = !inWatchlist;
    //     setInWatchlist(newInWatchlist);
    //     if (newInWatchlist === true) {
    //         await addToWatchlist(watchlistId, movieId);
    //     } else {
    //         await removeFromWatchlist(watchlistId, movieId);
    //     }
    // };
    console.log("movie IN MOVIE", movie);
    const toggleLike = async (userId, movieId) => {
        const newLiked = !liked;
        startTransition(() => {
            setLiked(newLiked);
        });
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
            value={1}
            // value={{
            //     listOwner,
            //     liked,
            //     listId,
            //     movie,
            //     movieId,
            //     userId,
            //     hideMoreOptions,
            // }}
        >
            <div className="movie-poster relative flex flex-col items-center rounded-sm">
                <Poster
                    title={
                        movie.title +
                        " (" +
                        movie.release_date.split("-")[0] +
                        ")"
                    }
                    path={movie.poster_path}
                    height={height}
                    width={width}
                ></Poster>
                <MainOptions>
                    <LikeButton
                        handleClick={(e) => toggleLike(user.id, movie.id)}
                        size={22}
                        liked={liked}
                    ></LikeButton>
                </MainOptions>
                {/* {authed && (
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
                )} */}
            </div>
        </MovieContext.Provider>
    );
}
