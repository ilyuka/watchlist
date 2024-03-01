"use client";

import { useState, useEffect } from "react";
import { fetchMovieData, fetchMoviesData } from "@/app/api/data";
import { useSession } from "next-auth/react";
import SearchFieldResults from "./SearchFieldResults";

type Props = {
    handleClick: Function;
};

export default function SearchField({ handleClick }) {
    // const { data: session, status } = useSession();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        if (query !== "") {
            setIsLoading(true);
            setTimer(
                setTimeout(() => {
                    searchMovies(query);
                    setIsLoading(false);
                }, 500),
            );
        } else {
            setIsLoading(false);
        }
    }, [query]);

    async function searchMovies(query: string) {
        const results = await fetchMoviesData(query);
        console.log(results);
        setResults(results.results);
    }
    return (
        <div className="relative">
            <div className="flex items-center">
                <input
                    className="text-black"
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    onFocus={() => setIsShown(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setIsShown(false);
                        }, 100)
                    }
                    placeholder="Search for a movie..."
                />
                {isLoading && <span className="loader"></span>}
            </div>

            {query !== "" && isShown && (
                <div className="absolute bg-stone-900">
                    <SearchFieldResults
                        results={results}
                        handleClick={handleClick}
                    ></SearchFieldResults>
                </div>
            )}
        </div>
    );
}
