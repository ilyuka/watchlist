import BackdropPoster from "./BackdropPoster";
import MoviePageMovie from "@/components/MoviePage/MoviePageMovie";
import GuestMovie from "../Movie/GuestMovie";
import Poster from "@/components/Lists/Poster";

export default function MoviePage({
    currentUser,
    movie,
    inWatchlist,
    isLiked,
    base64,
}) {
    return (
        <div>
            {movie.backdrop_path && (
                <BackdropPoster
                    backdrop_path={movie.backdrop_path}
                    base64={base64}
                ></BackdropPoster>
            )}
            {currentUser ? (
                <MoviePageMovie
                    key={movie.id}
                    currentUser={currentUser}
                    movie={movie}
                    positionOnTheList={movie.positionOnTheList}
                    isLikedProp={isLiked}
                    inWatchlistProp={inWatchlist}
                >
                    <Poster
                        title={
                            movie.title +
                            " (" +
                            movie.release_date.split("-")[0] +
                            ")"
                        }
                        path={movie.poster_path}
                        height={250}
                        width={200}
                    ></Poster>
                </MoviePageMovie>
            ) : (
                <GuestMovie>
                    {" "}
                    <Poster
                        title={
                            movie.title +
                            " (" +
                            movie.release_date.split("-")[0] +
                            ")"
                        }
                        path={movie.poster_path}
                        height={250}
                        width={200}
                    ></Poster>
                </GuestMovie>
            )}
        </div>
    );
}
