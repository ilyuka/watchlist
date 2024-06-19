import { useEffect, useState, useRef } from "react";
import Option, { OptionLink } from "@/components/Movie/Option";

export default function MoreOptions({
    isLiked,
    toggleLike,
    toggleInWatchlist,
    inWatchlist,
    hideMoreOptions,
    movie,
}) {
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
                style={{ left: "80%" }}
                onMouseEnter={() => {
                    setMouseEntered(true);
                }}
                onMouseLeave={() => setTimeout(hideMoreOptions, 150)}
            >
                <Option
                    text={isLiked ? "Unlike" : "Like"}
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
                <OptionLink
                    href={`/movie/addToLists/${movie.id}`}
                    text="Add to lists..."
                ></OptionLink>
            </ul>
        </>
    );
}
