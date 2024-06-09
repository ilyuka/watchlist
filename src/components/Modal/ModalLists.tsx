"use client";

import { useState } from "react";
import ModalList from "./ModalList";
import ModalListDisabled from "./ModalListDisabled";

export default function ModalLists({ lists }) {
    const [selectedLists, setSelectedLists] = useState({});
    return (
        <div>
            {lists.map((list) => {
                if (!list.isWatchlist && list.movies.length > 0) {
                    return (
                        <ModalListDisabled
                            key={list.id}
                            list={list}
                        ></ModalListDisabled>
                    );
                }
                return (
                    !list.isWatchlist && (
                        <ModalList
                            key={list.id}
                            list={list}
                            setSelectedLists={setSelectedLists}
                        ></ModalList>
                    )
                );
            })}
            <button
                onClick={(e) => {
                    console.log(selectedLists);
                }}
            >
                done
            </button>
        </div>
    );
}
