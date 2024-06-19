export default function MoviePageTitle({ movie }) {
    return (
        <div>
            <span>{movie.title}</span>
            <span>{movie.release_date}</span>
            <span>Directed by ?</span>
        </div>
    );
}
