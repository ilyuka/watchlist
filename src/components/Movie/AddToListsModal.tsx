import { useEffect, useState, useContext } from "react";
import AddToListsMovie from "./AddToListsMovie";
import Link from "next/link";
import { MovieContext } from "./Movie";

export default function AddToListsModal() {
    const { userId, movieId } = useContext(MovieContext);

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `/api/userLists?userId=${userId}&movieId=${movieId}`,
            );
            const json = await res.json();
            setData(json);
            console.log(json);
        };

        fetchData();
    }, []);

    if (!data)
        return (
            <div
                className="absolute bottom-4 z-20 flex w-max flex-col rounded-md border border-stone-500 bg-stone-900/95 text-sm text-emerald-50 shadow-2xl"
                style={{ left: "100%", top: "50%" }}
            >
                <h1>Loading...</h1>
            </div>
        );

    return (
        <div
            className="absolute bottom-4 z-20 flex min-h-full w-max flex-col overflow-y-scroll rounded-md border border-stone-500 bg-stone-900/95 text-sm text-emerald-50 shadow-2xl"
            style={{ left: "100%", top: "50%", transform: "translateY(-50%)" }}
        >
            {data.userLists.length === 0 ? (
                <div>no lists yet</div>
            ) : (
                <div className="flex flex-col">
                    <Link
                        href="/list/create"
                        className="flex items-center justify-between gap-4 border-b border-b-stone-500 px-2 py-2 font-bold hover:bg-stone-700"
                    >
                        <button>+New List...</button>
                    </Link>
                    {data.userLists.map((list, index) => {
                        return <AddToListsMovie key={list.id} list={list} />;
                    })}
                </div>
            )}
        </div>
    );
}
