"use client";

import { deleteListByListId } from "@/actions/list";
import Button from "@/components/Utils/Button";
import { NotificationsContext } from "@/components/providers/MyNotificationProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DeleteListButton({ list }) {
    const router = useRouter();
    const { notify } = useContext(NotificationsContext);

    const deleteList = async (listId: number) => {
        await deleteListByListId(listId);
        router.back();
        notify("Successfully deleted list");
    };

    return (
        <Button
            handleClick={() => {
                deleteList(list.id);
            }}
            text={"Delete"}
            bgColorClassname={"bg-gray-100"}
        ></Button>
    );
}
