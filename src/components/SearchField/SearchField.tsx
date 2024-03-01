"use client";

import { useState, useEffect } from "react";
import { fetchMovieData, fetchMoviesData } from "@/app/api/data";
import { useSession } from "next-auth/react";
import Results from "./Results";

type Props = {
    handleClick: Function;
};

export default function SearchField({ handleClick }) {
    // const { data: session, status } = useSession();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        if (query !== "") {
            setTimer(setTimeout(() => searchMovies(query), 500));
        }
    }, [query]);

    async function searchMovies(query: string) {
        const results = await fetchMoviesData(query);
        console.log(results);
        setResults(results.results);
    }
    return (
        <div>
            <input
                className="text-black"
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                placeholder="Search for a movie..."
            />
            {query !== "" && (
                <div>
                    <Results
                        results={results}
                        handleClick={handleClick}
                    ></Results>
                </div>
            )}
        </div>
    );
}
