import ErrorPage from "next/error";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username || "";
    const { user } = await getData(username);
    if (!user) {
        return <h1>404</h1>;
    }
    return <h1>here</h1>;
}

async function getData(username: string) {
    const res = await fetch(
        process.env.URL + `/api/userExists/?username=${username}`,
        { method: "GET" },
    );
    const data = await res.json();

    if (data.status === 200) {
        return { user: username };
    } else {
        return { user: null };
    }
}
