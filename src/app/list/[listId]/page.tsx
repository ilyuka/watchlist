import { getCurrentUser } from "@/lib/auth/getUser";
import { getListByListId } from "@/actions/list";
import { getAllMoviesFromList } from "@/actions/movieOnList";
import { getMoviesLikes } from "@/actions/movieLike";
import { notFound, redirect } from "next/navigation";
import { getWatchlistIntersectListMovies } from "@/actions/watchlist";
import Movie from "@/components/Movie/Movie";
import GuestMovie from "@/components/Movie/GuestMovie";
import Poster from "@/components/Lists/Poster";
import Link from "next/link";

export default async function Page({ params }) {
    const [list, movies, currentUser] = await Promise.all([
        await getListByListId(Number(params.listId)),
        await getAllMoviesFromList(Number(params.listId)),
        await getCurrentUser(),
    ]);
    if (list == null || movies == null) {
        return notFound();
    }

    let movieIds = movies.map((movie) => movie.movie.id);

    if (list.id === list.user.watchlistId) {
        redirect(`/${list.user.username}/watchlist`);
    }

    let body = undefined;
    let currentUserLikes = undefined;
    let inWatchlistIds = undefined; // in watchlist and in the current list

    if (!currentUser) {
        body = (
            <div className="my-4 grid max-w-2xl grid-cols-5 gap-4">
                {movies.map((movie) => {
                    return (
                        <GuestMovie key={movie.id}>
                            <Poster
                                title={
                                    movie.movie.title +
                                    " (" +
                                    movie.movie.release_date.split("-")[0] +
                                    ")"
                                }
                                path={movie.movie.poster_path}
                                height={187}
                                width={125}
                            ></Poster>
                        </GuestMovie>
                    );
                })}
            </div>
        );
    } else {
        [currentUserLikes, inWatchlistIds] = await Promise.all([
            await getMoviesLikes(currentUser.id, movieIds),
            await getWatchlistIntersectListMovies(
                currentUser.watchlistId,
                list.id,
            ),
        ]);
        body = (
            <div className="my-4 grid max-w-2xl grid-cols-5 gap-4">
                {movies.map((movie) => {
                    return (
                        <Movie
                            key={movie.id}
                            currentUser={currentUser}
                            movie={movie.movie}
                            positionOnTheList={movie.positionOnTheList}
                            list={list}
                            isLikedProp={currentUserLikes.find(
                                (like) => like.movieId === movie.movie.id,
                            )}
                            inWatchlistProp={inWatchlistIds.includes(
                                movie.movie.tmdbId,
                            )}
                        >
                            <Poster
                                title={
                                    movie.movie.title +
                                    " (" +
                                    movie.movie.release_date.split("-")[0] +
                                    ")"
                                }
                                path={movie.movie.poster_path}
                                height={187}
                                width={125}
                            ></Poster>
                        </Movie>
                    );
                })}
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-4xl  py-4">
            <div>
                <p>List by {list.user.username}</p>
            </div>
            <div className={"text-2xl font-bold"}>
                <h1>{list.title}</h1>
            </div>
            <div className="text-zinc-400">
                <p>{list.description}</p>
            </div>
            <div>
                <p>{list?.createdAt.toString()}</p>
                <p>{list?.updatedAt.toString()}</p>
            </div>
            {body}
        </main>
    );
}
