import { getListsByUsername } from "@/services/listService";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username || "";
    const user = await getData(username);
    if (!user) {
        return <h1>404</h1>;
    }
    const session = await getServerSession(authOptions);
    const lists = await getListsByUsername(user.id);

    return (
        <div>
            <div>
                {session && <Link href="/list/create">Add New List</Link>}
            </div>
        </div>
    );
}

async function getData(username: string) {
    const res = await fetch(
        process.env.URL + `/api/userExists/?username=${username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const data = await res.json();

    if (data.status === 200) {
        return { user: data.user };
    } else {
        return { user: null };
    }
}
