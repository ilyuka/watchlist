import { useEffect, useState, useRef, useContext } from "react";
import Option from "./Option";
import Link from "next/link";
import AddToListsOption from "./AddToListsOption";
import RemoveFromListOption from "./RemoveFromListOption";
import { MovieContext } from "./Movie";

export default function MoreOptions({
    toggleLike,
    toggleInWatchlist,
    inWatchlist,
}) {
    const { listOwner, userId, liked, hideMoreOptions, movieId } =
        useContext(MovieContext);

    const [mouseEntered, setMouseEntered] = useState(false);
    const mouseEnteredRef = useRef(mouseEntered);

    useEffect(() => {
        mouseEnteredRef.current = mouseEntered;
    }, [mouseEntered]);

    useEffect(() => {
        setTimeout(() => {
            if (!mouseEnteredRef.current) {
                hideMoreOptions();
            }
        }, 1000);
    }, [hideMoreOptions]);

    return (
        <>
            <ul
                className="absolute bottom-4 z-20 flex w-max flex-col rounded-md border border-stone-500 bg-stone-900/95 text-sm text-emerald-50 shadow-2xl"
                style={{ left: "90%" }}
                onMouseEnter={() => {
                    setMouseEntered(true);
                }}
                onMouseLeave={() => setTimeout(hideMoreOptions, 150)}
            >
                <Option
                    text={liked ? "Unlike" : "Like"}
                    handleClick={toggleLike}
                    isFirst={true}
                ></Option>
                <Option
                    text={
                        inWatchlist
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"
                    }
                    handleClick={toggleInWatchlist}
                ></Option>
                <AddToListsOption></AddToListsOption>
                {listOwner.id === userId && <RemoveFromListOption />}

                <Link
                    className="w-full border-t border-t-stone-500 px-4 py-3 text-center hover:bg-stone-500"
                    href={`/movie/${movieId}`}
                >
                    Go to the film
                </Link>
            </ul>
        </>
    );
}
