"use client";
import { useState, useEffect } from "react";
import { getUserLists } from "@/helpers/api";
import type { ListInterface } from "@/types/list";
import ListPreview from "@/components/Lists/ListPreview";

export default function Lists({
    isOwner,
    user,
}: {
    user: { id: number; username: string };
    isOwner: boolean;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [lists, setLists] = useState<ListInterface[]>([]);

    useEffect(() => {
        getUserLists(user)
            .then((lists) => {
                setLists(lists);
            })
            .catch((e) => {
                console.error(e);
                setIsError(true);
            })
            .finally(() => setIsLoading(false));
    }, [user]);

    if (isError) {
        return <div> error while fetching </div>;
    }
    if (isLoading) {
        return <div>loading lists...</div>;
    }
    if (lists.length === 0) {
        return <div> no lists </div>;
    }
    console.log("rendering lists");
    return (
        <div className="my-4">
            {lists.map((list, index) => {
                return (
                    <ListPreview
                        key={list.id}
                        list={list}
                        isOwner={isOwner}
                        lastIndex={index === lists.length - 1}
                    ></ListPreview>
                );
            })}
        </div>
    );
}
