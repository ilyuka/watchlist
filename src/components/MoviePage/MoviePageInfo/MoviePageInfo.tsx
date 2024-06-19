import MoviePageTitle from "./MoviePageTitle";
import MoviePageDescription from "./MoviePageDescription";

export default function MoviePageInfo({ movie }) {
    return (
        <div style={{ height: "200vh", border: "1px solid red" }}>
            <MoviePageTitle movie={movie}></MoviePageTitle>
            <MoviePageDescription movie={movie}></MoviePageDescription>
        </div>
    );
}
