import { getMovieByTmdbId, addMovieToDb } from "@/actions/movie";
import { fetchMovieData } from "@/app/api/data";
import MoviePage from "@/components/MoviePage/MoviePage";
import "./localOverwrite.css";
import { getPlaiceholder } from "plaiceholder";

export default async function Page({ params }) {
    console.log(params);
    let movie;
    movie = await getMovieByTmdbId(params.tmdbId);
    if (movie.error) {
        movie = await fetchMovieData(params.tmdbId);
        await addMovieToDb(movie);
    }
    const src = `https://image.tmdb.org/t/p/w500${movie.movie.backdrop_path}`;
    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
    );
    const { base64 } = await getPlaiceholder(buffer);
    return (
        <main
            className="mx-auto max-w-7xl"
            style={{ position: "relative", top: "-67px" }}
        >
            <MoviePage movie={movie.movie} base64={base64}></MoviePage>
        </main>
    );
    // Movie client component
    // side component: movie options
    // comments component
}
