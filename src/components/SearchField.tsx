"use client";

import { useState, useEffect } from "react";
import { fetchMoviesData } from "@/api/data";

export default function SearchField() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    async function updateList() {
        const results = await fetchMoviesData(input);
        setResults(results.results);
        console.log(results);
    }
    return (
        <div className="border border-solid border-red-500 text-white">
            <input
                className="text-black"
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
