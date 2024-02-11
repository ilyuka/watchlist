"use client";

import { useState, useEffect } from "react";
import { fetchMoviesData } from "@/app/api/data";
import { useSession } from "next-auth/react";

export default function SearchField() {
    const { data: session, status } = useSession();
    console.log("CLIENT SESSION: ", session, status);

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
                    <hr />
                </div>
            ))}
        </div>
    );
}
