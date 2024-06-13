import { Modal } from "@/components/Modal/Modal";
import { getCurrentUser } from "@/lib/auth/getUser";
import X from "@/components/svgs/X";
import CloseModalX from "@/components/Modal/CloseModalX";
import { getMovieByDbId } from "@/actions/movie";
import { getAllUserListsAndMoviesFromList } from "@/actions/list";
import ModalLists from "@/components/Modal/ModalLists";

export default async function DeleteListModal({ params: { movieId } }) {
    const [currentUser, movie] = await Promise.all([
        getCurrentUser(),
        getMovieByDbId(Number(movieId)),
    ]);
    if (!currentUser) {
        throw new Error("dont have access rights");
    }
    const listsModified = await getAllUserListsAndMoviesFromList(
        currentUser.id,
        Number(movieId),
    );
    return (
        <Modal>
            <div className="min-w-96 rounded-lg bg-slate-600 py-6 text-gray-200">
                <div className="mb-4 flex justify-between px-6">
                    <div className="text-lg font-bold">
                        Add{" "}
                        <span className="text-fuchsia-400">
                            {movie.movie.title}
                        </span>{" "}
                        to lists
                    </div>
                    <CloseModalX>
                        <X></X>
                    </CloseModalX>
                </div>
                <ModalLists
                    movieId={movie.movie.id}
                    lists={listsModified}
                ></ModalLists>
            </div>
        </Modal>
    );
}
