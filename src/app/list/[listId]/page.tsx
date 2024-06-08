import { getCurrentUser } from "@/helpers/auth/getUser";
import { getListByListId } from "@/actions/list";
import { getAllMoviesFromList } from "@/actions/movies";
import { getMoviesLikes } from "@/actions/movieLike";
import { notFound, redirect } from "next/navigation";
import { getWatchlistIntersectListMovies } from "@/actions/watchlist";
import Movie from "@/components/Movie/Movie";

export default async function Page({ params }) {
    const [list, movies, currentUser] = await Promise.all([
        await getListByListId(Number(params.listId)),
        await getAllMoviesFromList(Number(params.listId)),
        await getCurrentUser(),
    ]);
    if (list == null || movies == null) {
        return notFound();
    }

    let movieIds = movies.map((movie) => movie.movie.tmdbId);

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
                    return <GuestMovie></GuestMovie>;
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
                            user={user}
                            key={movie.id}
                            movie={movie.movie}
                            movieId={movie.tmdbId}
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
                            width={125}
                            height={187}
                        ></Movie>
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
    return (
        <main className="mx-auto max-w-4xl  py-4">
            <div>
                <p>List by {listOwner.username}</p>
            </div>
            <div
                className={
                    user && list.id === user.watchlistId
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
                    return user ? (
                        <Movie
                            user={user}
                            key={movie.id}
                            movie={movie.movie}
                            movieId={movie.tmdbId}
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
                            width={125}
                            height={187}
                        ></Movie>
                    ) : (
                        <Movie
                            authed={!!user}
                            key={movie.id}
                            movie={movie.movie}
                            movieId={movie.tmdbId}
                            listId={Number(params.listId)}
                            listOwner={listOwner}
                            isLiked={false}
                            userId={-1}
                            inWatchlist_={false}
                            watchlistId={-1}
                            width={125}
                            height={187}
                        ></Movie>
                    );
                })}
            </div>
        </main>
    );
}
