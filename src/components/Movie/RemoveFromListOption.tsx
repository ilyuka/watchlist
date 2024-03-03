import { useContext, useState } from "react";
import RemoveFromListModal from "./RemoveFromListModal";
import { MovieContext } from "./Movie";

export default function RemoveFromListOption() {
    const [showRemoveFromListModal, setShowRemoveFromListModal] =
        useState(false);
    const { movie, hideMoreOptions } = useContext(MovieContext);

    const show = () => {
        setShowRemoveFromListModal(true);
    };
    const hide = () => {
        setShowRemoveFromListModal(false);
        hideMoreOptions();
    };
    return (
        <>
            <button
                className="w-full border-t border-t-stone-500 px-4 py-3 text-center hover:bg-stone-500"
                onClick={show}
            >
                Remove from this list
            </button>
            {showRemoveFromListModal && (
                <RemoveFromListModal
                    movie={movie}
                    hide={hide}
                ></RemoveFromListModal>
            )}
        </>
    );
}
