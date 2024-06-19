"use client";
import { useState, useTransition } from "react";
import { addMovieToList, deleteMovieFromList } from "@/actions/movieOnList";
import { addMovieLike, removeMovieLike } from "@/actions/movieLike";
import MainOptions from "@/components/Movie/MainOptions";
import LikeButton from "@/components/Utils/SvgButtons/LikeButton";
import EyeButton from "@/components/Utils/SvgButtons/EyeButton";
import DotsHorizontalButton from "../Utils/SvgButtons/DotsHorizontalButton";
import MoreOptions from "./MoreOptions";

export default function MoviePageMovie({
    currentUser,
    movie,
    positionOnTheList,
    isLikedProp,
    inWatchlistProp,
    children,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [inWatchlist, setInWatchlist] = useState(inWatchlistProp);
    const [isPending, startTransition] = useTransition();

    const toggleInWatchlist = async (listId, movieId) => {
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

    return (
        <div className="movie-poster relative flex flex-col items-center ">
            {children}
            <MainOptions>
                <EyeButton
                    handleClick={(e) => {
                        toggleInWatchlist(currentUser.watchlistId, movie.id);
                    }}
                    size={22}
                    inWatchlist={inWatchlist}
                />
                <LikeButton
                    handleClick={(e) => toggleLike(currentUser.id, movie.id)}
                    size={22}
                    liked={isLiked}
                />
                <DotsHorizontalButton handleClick={showMoreOptions} size={22} />
            </MainOptions>
            {showOptions && (
                <MoreOptions
                    isLiked={isLiked}
                    toggleLike={toggleLike.bind(null, currentUser.id, movie.id)}
                    toggleInWatchlist={toggleInWatchlist.bind(
                        null,
                        currentUser.watchlistId,
                        movie.id,
                    )}
                    inWatchlist={inWatchlist}
                    hideMoreOptions={hideMoreOptions}
                    movie={movie}
                ></MoreOptions>
            )}
        </div>
    );
}
