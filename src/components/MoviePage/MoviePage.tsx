import BackdropPoster from "./BackdropPoster";

export default function MoviePage({ movie, inWatchlist, isLiked, base64 }) {
    return (
        <div>
            {movie.backdrop_path && (
                <BackdropPoster
                    backdrop_path={movie.backdrop_path}
                    base64={base64}
                ></BackdropPoster>
            )}
            <div>{/* <Movie></Movie> */}</div>
        </div>
    );
}
