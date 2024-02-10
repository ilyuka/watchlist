"use server";
import axios from "axios";

export async function fetchMoviesData(inputQuery: string) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${inputQuery}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
