"use client";

import { useState, useEffect } from "react";
import { fetchMovieData, fetchMoviesData } from "@/app/api/data";
import { useSession } from "next-auth/react";

export default function SearchField() {
    const { data: session, status } = useSession();

    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    async function updateList() {
        const results = await fetchMoviesData(input);
        setResults(results.results);
        console.log(results);
    }
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button
                onClick={() => {
                    updateList();
                }}
            >
                find movies
            </button>
            {results.map((movie) => (
                <div key={movie.id}>
                    <h4>{movie.title}</h4>
                    <p>{movie.release_date}</p>
                    <button
                        onClick={async (e) => {
                            console.log(await fetchMovieData(movie.id));
                            2;
                        }}
                    >
                        log
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
}
