import { getListByListId } from "@/services/listService";
import { allMoviesFromList } from "@/services/movieService";
import Movie from "@/components/Movie";

export default async function Page({ params }) {
    const movies = await allMoviesFromList(Number(params.listId));
    const list = await getListByListId(Number(params.listId));
    console.log("MOVIES HERE", movies);
    return (
        <main className="mx-auto max-w-4xl  py-4">
            <div>
                <p>List by user</p>
            </div>
            <div className="text-xl font-bold">
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
                    return <Movie movie={movie}></Movie>;
                })}
            </div>
        </main>
    );
}
