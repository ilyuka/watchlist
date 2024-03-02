import { useEffect, useState, useRef } from "react";

export default function MoreOptions({ hide }) {
    const [mouseEntered, setMouseEntered] = useState(false);
    const mouseEnteredRef = useRef(mouseEntered);

    useEffect(() => {
        mouseEnteredRef.current = mouseEntered;
    }, [mouseEntered]);

    useEffect(() => {
        setTimeout(() => {
            if (!mouseEnteredRef.current) {
                hide();
            }
        }, 1000);
    }, [hide]);

    return (
        <ul
            className="absolute bottom-4 z-20 flex w-max flex-col rounded-md border border-stone-500 bg-stone-900/95 text-sm text-emerald-50 shadow-2xl"
            style={{ left: "90%" }}
            onMouseEnter={() => {
                setMouseEntered(true);
            }}
            onMouseLeave={() => setTimeout(hide, 150)}
        >
            <li className="px-4 py-3">Like</li>
            <li className="border-t border-t-stone-500 px-4 py-3">
                Add to Watchlist
            </li>
            <li className="border-t border-t-stone-500 px-4 py-3">
                Add to lists...
            </li>
            <li className="border-t border-t-stone-500 px-4 py-3">
                Remove from this list
            </li>
            <li className="border-t border-t-stone-500 px-4 py-3">
                Go the film
            </li>
        </ul>
    );
}
