const axios = require("axios").default;
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/helpers/auth";
import FormTitle from "@/components/ListForm/FormTitle";
import Lists from "@/components/Lists/Lists";

const getUser = async (username: string) => {
    try {
        const responseUser = await axios({
            url:
                process.env.NEXT_PUBLIC_URL +
                `/api/userExists?username=${username}`,
            method: "GET",
        });
        const user = responseUser.data.user;
        if (!user || !user.id || !user.username) {
            return null;
        }
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params["username"];
    if (!username) {
        return notFound();
    }
    const user = await getUser(username);
    if (!user) {
        return notFound();
    }
    const session = await auth();
    const isOwner =
        session.user.id === user.id && session.user.username === user.username;
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
