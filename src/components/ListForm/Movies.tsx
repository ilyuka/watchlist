import Image from "next/image";
import X from "../svgs/X";

export default function Movies({ movies, deleteMovie }) {
    if (movies.length === 0) {
        return (
            <div className="my-4 grid min-h-44 place-items-center items-center border border-cyan-100">
                <div className="flex flex-col items-center">
                    <h2 className="mb-1 text-lg font-bold">
                        Your list is empty.
                    </h2>
                    <p className="text-sm text-gray-400">
                        Add films using the search field above.
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="my-4">
                {movies.map((movie, index) => {
                    return (
                        <div
                            className={`flex items-center justify-between border border-cyan-300/80 bg-gray-800/80 ${index === movies.length - 1 ? "" : "border-b-transparent"}`}
                            key={movie.id}
                        >
                            <div className="flex items-center gap-2  p-1">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    width={50}
                                    height={75}
                                    className="text-sm italic"
                                ></Image>
                                <div className="text-lg font-bold">
                                    {movie.title}
                                </div>
                                <div className="font-light">
                                    ({movie.release_date.split("-")[0]})
                                </div>
                            </div>
                            <div className="mr-4 cursor-pointer">
                                <button
                                    onClick={(e) => {
                                        deleteMovie(movie.id);
                                    }}
                                >
                                    <X size={30} color="#ccfbf1" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
