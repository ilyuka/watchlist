import BackdropPoster from "./BackdropPoster";
import Movie from "../Movie/Movie";

export default function MoviePage({
    user,
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
            {user ? (
                <Movie
                    user={user}
                    movie={movie}
                    inWatchlist={inWatchlist}
                    isLiked={isLiked}
                    width={100}
                    height={250}
                ></Movie>
            ) : (
                <GuestMovie></GuestMovie>
            )}
        </div>
    );
}
