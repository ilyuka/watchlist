import { addMovieToList } from "@/services/movieService";
import { useContext } from "react";
import { NotificationsContext } from "../Notifications";
import { MovieContext } from "./Movie";

export default function AddToListsMovie({ list }) {
    const { hideMoreOptions, movieId } = useContext(MovieContext);
    const { notify } = useContext(NotificationsContext);

    if (list.hasMovie) {
        return (
            <button
                className="flex items-center justify-between gap-4 px-2 py-2 text-orange-300"
                disabled={true}
            >
                <div>{list.title}</div>
                <div className="text-xs text-gray-500">
                    {list.length} {list.length === 1 ? "film" : "films"}
                </div>
            </button>
        );
    } else {
        return (
            <button
                className="flex items-center justify-between gap-4 px-2 py-2 hover:bg-stone-700"
                onClick={async () => {
                    hideMoreOptions();
                    await addMovieToList(list.id, movieId);
                    notify(
                        `Film has been added to the <a class="underline" href=/list/${list.id}>${list.title}</a>`,
                    );
                }}
            >
                <div>{list.title}</div>
                <div className="text-xs text-gray-500">
                    {list.length} {list.length === 1 ? "film" : "films"}
                </div>
            </button>
        );
    }
}
