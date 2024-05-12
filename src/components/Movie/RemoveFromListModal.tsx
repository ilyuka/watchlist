import { removeMovieFromList } from "@/services/movieService";
import X from "../svgs/X";
import Button from "../Utils/Button";
import { useContext } from "react";
import { MovieContext } from "./Movie";
import { NotificationsContext } from "@/components/providers/MyNotificationProvider";
import { useRouter } from "next/navigation";

export default function RemoveFromListModal({ movie, hide }) {
    const router = useRouter();
    const { listId, movieId } = useContext(MovieContext);
    const { notify } = useContext(NotificationsContext);

    const deleteMovieFromList = async () => {
        const data = await fetch(`/api/listLength?listId=${listId}`);
        const { length } = await data.json();
        if (length === 1) {
            hide();
            notify("Can't delete last movie from list");
            return;
        }
        hide();
        await removeMovieFromList(listId, movieId);
        notify(`Movie ${movie.movie.title} has been removed from this list`);
        router.refresh();
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="flex flex-col gap-4 rounded-xl border border-stone-300 bg-stone-800 p-8 pt-6">
                <div className="self-end">
                    <button onClick={hide}>
                        <X size={25} hoverClassName="hover:text-red-500" />
                    </button>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        {`Are you sure you want to delete "${movie.movie.title}" from the
                    list?`}
                    </h2>
                </div>
                <div className="mr-4 flex gap-5 self-end">
                    <Button
                        text={"Cancel"}
                        handleClick={hide}
                        bgColorClassname={"bg-stone-500"}
                        hoverBgColorClassname={"hover:bg-stone-400"}
                    ></Button>
                    <Button
                        text={"Yes"}
                        handleClick={deleteMovieFromList}
                        bgColorClassname={"bg-stone-500"}
                        hoverBgColorClassname={"hover:bg-red-500"}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
