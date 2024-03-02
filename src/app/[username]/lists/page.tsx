import { getListsByUsername } from "@/services/listService";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormTitle from "@/components/ListForm/FormTitle";
import List from "@/components/List";
import { firstFiveMoviesFromList } from "@/services/movieService";
import { countMoviesOnList } from "@/services/listService";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username || "";
    const user = await getData(username);
    if (!user) {
        return <h1>404</h1>;
    }
    const session = await getServerSession(authOptions);
    console.log("SERVERSESSSSION", session);
    const lists = await getListsByUsername(user.id);
    const movies = {};
    const lengths = {};
    for (const list of lists) {
        movies[list.id] = [];
        const firstFiveMovies = await firstFiveMoviesFromList(list.id);
        for (const movieOnList of firstFiveMovies) {
            console.log(movieOnList.movie);
            movies[list.id].push(movieOnList.movie);
        }
        const length = await countMoviesOnList(list.id);
        lengths[list.id] = length;
    }

    return (
        <main className="mx-auto max-w-4xl ">
            <FormTitle title={`${username}'s Lists`} />
            <div>
                {session && <Link href="/list/create">Start New List</Link>}
            </div>
            <div className="my-4">
                {lists.map((list, index) => {
                    return (
                        <List
                            key={list.id}
                            list={list}
                            movies={movies[list.id]}
                            length={lengths[list.id]}
                            lastIndex={index === lists.length - 1}
                            isOwner={session?.user.username === username}
                        ></List>
                    );
                })}
            </div>
        </main>
    );
}

async function getData(username: string) {
    const res = await fetch(
        process.env.URL + `/api/userExists/?username=${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const data = await res.json();

    if (data.status === 200) {
        return { user: data.user };
    } else {
        return { user: null };
    }
}
