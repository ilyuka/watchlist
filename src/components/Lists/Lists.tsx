"use client";
import List from "@/components/Lists/ListPreview";
import { useState, useEffect } from "react";
const axios = require("axios").default;

const getUserLists = async (user: { username: string; id: number }) => {
    try {
        const responseLists = await axios({
            url: process.env.NEXT_PUBLIC_URL + `/api/lists/user/${user.id}`,
            method: "GET",
        });
        const lists = responseLists.data.lists;
        if (!lists || responseLists.status >= 300) {
            return null;
        }
        return lists;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default function Lists({
    isOwner,
    user,
}: {
    user: { id: number; username: string };
    isOwner: boolean;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [lists, setLists] = useState([]);
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

    return (
        <div className="my-4">
            {lists.map((list, index) => {
                return (
                    <List
                        key={list.id}
                        list={list}
                        isOwner={isOwner}
                        lastIndex={index === lists.length - 1}
                    ></List>
                );
            })}
        </div>
    );
}
