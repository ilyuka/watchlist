"use client";
import DotsHorizontal from "../svgs/DotsHorizontal";
import { useState, createContext, useTransition } from "react";
import MoreOptions from "./MoreOptions";
import Poster from "../Lists/Poster";
import MainOptions from "./MainOptions";
import LikeButton from "../ActionButtons/LikeButton";
import EyeButton from "../ActionButtons/EyeButton";
import { addMovieToList, deleteMovieFromList } from "@/actions/movieOnList";
import { addMovieLike, removeMovieLike } from "@/actions/movieLike";

export const MovieContext = createContext(null);

export default function Movie({
    currentUser,
    movie,
    positionOnTheList,
    list,
    isLikedProp,
    inWatchlistProp,
    children,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [inWatchlist, setInWatchlist] = useState(inWatchlistProp);
    const [isPending, startTransition] = useTransition();

    const toggleInWatchlist = async (listId, movieId) => {
        console.log("toggling wk");
        const newInWatchlist = !inWatchlist;
        setInWatchlist(newInWatchlist);
        if (newInWatchlist === true) {
            await addMovieToList(listId, movieId);
        } else {
            await deleteMovieFromList(listId, movieId);
        }
    };
    const toggleLike = async (userId, movieId) => {
        const newLiked = !isLiked;
        startTransition(() => {
            setIsLiked(newLiked);
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
                {children}
                <MainOptions>
                    <EyeButton
                        handleClick={(e) => {
                            toggleInWatchlist(
                                currentUser.watchlistId,
                                movie.id,
                            );
                        }}
                        size={22}
                        inWatchlist={inWatchlist}
                    ></EyeButton>
                    <LikeButton
                        handleClick={(e) =>
                            toggleLike(currentUser.id, movie.id)
                        }
                        size={22}
                        liked={isLiked}
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
