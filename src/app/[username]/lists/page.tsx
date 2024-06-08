import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/helpers/auth/getUser";
import FormTitle from "@/components/ListForm/FormTitle";
import Lists from "@/components/Lists/Lists";
import { getUserDataForListsPreviews } from "@/actions/user";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params["username"];
    if (!username) {
        return notFound();
    }
    const [currentUser, listOwner] = await Promise.all([
        getCurrentUser(),
        getUserDataForListsPreviews(username),
    ]);
    if (!listOwner) {
        return notFound();
    }
    for (const list of listOwner.lists) {
        console.log(list.movies);
    }
    const isOwner = !!currentUser?.id && currentUser.id === listOwner.id;
    return (
        <main className="mx-auto max-w-4xl ">
            <FormTitle title={`${username}'s Lists`} />
            <div>
                {isOwner && <Link href="/list/create">Start New List</Link>}
            </div>
            <Lists
                lists={listOwner.lists}
                isOwner={isOwner}
                listOwner={listOwner}
            />
        </main>
    );
}
