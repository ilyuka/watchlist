import { getListByListId, getWatchlistMovies } from "@/services/listService";
import { allMoviesFromList } from "@/services/movieService";
import Movie from "@/components/Movie/Movie";
import { getUserByUsername } from "@/services/userService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMovieLikes } from "@/services/movieService";
import { getWatchlistIdByUserId } from "@/services/listService";

export default async function Page({ params }) {
    const movies = await allMoviesFromList(Number(params.listId));
    const movieIds = movies.map((movie) => movie.movie.tmdbId);
    const list = await getListByListId(Number(params.listId));
    const userOwner = await getUserByUsername(list.userId);
    const session = await getServerSession(authOptions);
    const user = session.user;
    const likes = await getMovieLikes(user.id, movieIds);
    const watchlistId = await getWatchlistIdByUserId(userOwner.id);
    const watchlistMovies = await getWatchlistMovies(watchlistId.id);
    const watchlistMoviesIds = watchlistMovies.map(
        (movie) => movie.movie.tmdbId,
    );
    console.log("WATCHLISt MOVIES IDS", watchlistMoviesIds);

    return (
        <main className="mx-auto max-w-4xl  py-4">
            <div>
                <p>List by {userOwner.username}</p>
            </div>
            <div className="text-2xl font-bold">
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
                    return (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            listId={Number(params.listId)}
                            isLiked={likes.find(
                                (like) => like.movieId === movie.movie.tmdbId,
                            )}
                            userId={user.id}
                            movieId={movie.movie.tmdbId}
                            inWatchlist_={watchlistMoviesIds.includes(
                                movie.movie.tmdbId,
                            )}
                            watchlistId={watchlistId.id}
                        ></Movie>
                    );
                })}
            </div>
        </main>
    );
}
