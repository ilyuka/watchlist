import MoviePageTitle from "./MoviePageTitle";

export default function MoviePageInfo({ movie }) {
    return (
        <div style={{ height: "200vh", border: "1px solid red" }}>
            <MoviePageTitle movie={movie}></MoviePageTitle>
        </div>
    );
}
