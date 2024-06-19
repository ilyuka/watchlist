import { Modal } from "@/components/Modal/Modal";
import { getCurrentUser } from "@/lib/auth/getUser";
import { getListByListId } from "@/actions/list";
import { getMovieByDbId } from "@/actions/movie";
import X from "@/components/svgs/X";
import CloseModalX from "@/components/Modal/CloseModalX";
import DeleteMovieButton from "./DeleteMovieButton";

export default async function DeleteMovieModal({
    params: { listId, movieId },
}) {
    const [currentUser, list, movie] = await Promise.all([
        getCurrentUser(),
        getListByListId(Number(listId)),
        getMovieByDbId(Number(movieId)),
    ]);
    const isOwner = currentUser.id === list.userId;
    if (!isOwner) {
        throw new Error("dont have access rights");
    }

    return (
        <Modal>
            <div className="max-w-lg rounded-lg bg-slate-600 px-8 py-6 text-gray-200">
                <div className="mb-6 flex justify-between">
                    <div className="text-lg font-bold">Confirm Removal</div>
                    <CloseModalX>
                        <X></X>
                    </CloseModalX>
                </div>
                <div className="pb-8">
                    Are you sure you want to delete movie{" "}
                    <span className="font-bold">{movie.movie.title}</span> from
                    the list{" "}
                    <span className="font-bold italic text-cyan-300">
                        {list.title}
                    </span>
                    ? There is no way to recover deleted data.
                </div>
                <div className="flex justify-end">
                    <DeleteMovieButton
                        list={list}
                        movie={movie.movie}
                    ></DeleteMovieButton>
                </div>
            </div>
        </Modal>
    );
}
