import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/helpers/auth/getUser";
import FormTitle from "@/components/ListForm/FormTitle";
import Lists from "@/components/Lists/Lists";
import { getUserByUsername } from "@/actions/user";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params["username"];
    if (!username) {
        return notFound();
    }
    const [user, currentUser] = await Promise.all([
        getUserByUsername(username),
        getCurrentUser()
    ]);
    if (!user) {
        return notFound();
    }
    const isOwner = !!currentUser.id && currentUser.id === user.id;
    return (
        <main className="mx-auto max-w-4xl ">
            <FormTitle title={`${username}'s Lists`} />
            <div>
                {isOwner && <Link href="/list/create">Start New List</Link>}
            </div>
            <Lists isOwner={isOwner} user={user} />
        </main>
    );
}
