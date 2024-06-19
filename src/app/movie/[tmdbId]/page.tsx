import { getMovieByTmdbId, addMovieToDb } from "@/actions/movie";
import { fetchMovieData } from "@/app/api/data";
import MoviePage from "@/components/MoviePage/MoviePage";
import "./localOverwrite.css";
import { auth } from "@/lib/auth/auth";
import { isMovieInWatchlist } from "@/actions/watchlist";
import { isMovieLiked } from "@/actions/movieLike";
import getBase64 from "./getBase64";

export default async function Page({ params }: { params: { tmdbId: string } }) {
    let [session, movie] = await Promise.all([
        auth(),
        getMovieByTmdbId(Number(params.tmdbId)),
    ]);

    let currentUser;
    let inWatchlist;
    let isLiked;

    if (movie.error) {
        movie = await fetchMovieData(params.tmdbId);
        addMovieToDb(movie); // no `await`
    } else {
        movie = movie.movie;
    }

    if (session) {
        currentUser = session.user;
        let watchlistId = currentUser.watchlistId;
        [inWatchlist, isLiked] = await Promise.all([
            isMovieInWatchlist(movie.id, watchlistId),
            isMovieLiked(movie.id, currentUser.id),
        ]);
    }

    const base64 =
        movie.backdrop_path && (await getBase64(movie.backdrop_path));

    return (
        <main className="moviePage ">
            <div className="mx-auto max-w-7xl">
                <MoviePage
                    currentUser={currentUser}
                    movie={movie}
                    inWatchlist={inWatchlist}
                    isLiked={isLiked}
                    base64={base64}
                ></MoviePage>
            </div>
        </main>
    );
    // Movie client component
    // side component: movie options
    // comments component
}
