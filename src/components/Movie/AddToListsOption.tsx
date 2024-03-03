import { useState } from "react";
import AddToListsModal from "./AddToListsModal";

export default function AddToListsOption() {
    const [showLists, setShowLists] = useState(false);
    return (
        <button
            className="w-full border-t border-t-stone-500 px-4 py-3 text-center hover:bg-stone-500"
            onMouseEnter={() => {
                setShowLists(true);
            }}
            onMouseLeave={() => {
                setShowLists(false);
            }}
        >
            Add to Lists...
            {showLists && <AddToListsModal></AddToListsModal>}
        </button>
    );
}
