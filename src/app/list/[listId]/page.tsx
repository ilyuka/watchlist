import { auth } from "@/helpers/auth";
import { getListByListId } from "@/actions/list";
import { getAllMoviesFromList } from "@/actions/movies";
import { getMoviesLikes } from "@/actions/movies";
import { notFound } from "next/navigation";
import { getWatchlistMovies } from "@/actions/watchlist";
import Movie from "@/components/Movie/Movie";
import React, { memo } from "react";

export default async function Page({ params }) {
    const [list, movies, session] = await Promise.all([
        await getListByListId(Number(params.listId)),
        await getAllMoviesFromList(Number(params.listId)),
        await auth(),
    ]);
    if (!list || !movies) {
        return notFound();
    }

    let listOwner = list.user;
    let user;
    let isOwner;
    let likes;
    let watchlistMovies;
    let movieIds = movies.map((movie) => movie.movie.tmdbId);
    let watchlistId;
    let watchlistMoviesIds;

    if (session) {
        user = session.user;
        isOwner = session.user.id === list.userId;
        watchlistId = user.watchlistId;
        [likes, watchlistMovies] = await Promise.all([
            await getMoviesLikes(user.id, movieIds),
            await getWatchlistMovies(watchlistId),
        ]);
        watchlistMoviesIds = watchlistMovies.map((movie) => movie.movie.tmdbId);
    } else {
        isOwner = false;
    }

    if (session && (!listOwner || !likes || !watchlistMovies)) {
        console.log(listOwner, likes, watchlistMovies);
        return <div>500 page</div>;
    }

    return (
        <main className="mx-auto max-w-4xl  py-4">
            <div>
                <p>List by {listOwner.username}</p>
            </div>
            <div
                className={
                    session && list.id === user.watchlistId
                        ? "text-2xl font-bold text-orange-300"
                        : "text-2xl font-bold"
                }
            >
                <h1>{list.title}</h1>
            </div>
            <div className="text-zinc-400">
                <p>{list.description}</p>
            </div>
            <div>
                <p>{list?.createdAt.toString()}</p>
                <p>{list?.updatedAt.toString()}</p>
            </div>
            <div className="my-4 grid max-w-2xl grid-cols-5 gap-4">
                {movies.map((movie) => {
                    return session ? (
                        <Movie
                            authed={!!session}
                            key={movie.id}
                            movie={movie}
                            movieId={movie.movie.tmdbId}
                            listId={Number(params.listId)}
                            listOwner={listOwner}
                            isLiked={likes.find(
                                (like) => like.movieId === movie.movie.tmdbId,
                            )}
                            userId={user.id}
                            inWatchlist_={watchlistMoviesIds.includes(
                                movie.movie.tmdbId,
                            )}
                            watchlistId={watchlistId}
                        ></Movie>
                    ) : (
                        <Movie
                            authed={!!session}
                            key={movie.id}
                            movie={movie}
                            movieId={movie.movie.tmdbId}
                            listId={Number(params.listId)}
                            listOwner={listOwner}
                            isLiked={false}
                            userId={-1}
                            inWatchlist_={false}
                            watchlistId={-1}
                        ></Movie>
                    );
                })}
            </div>
        </main>
    );
}
