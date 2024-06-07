"use server";
import axios from "axios";
import { auth } from "@/helpers/auth/auth";
import { redirect } from "next/navigation";
import CreateForm from "../../create/CreateForm";

async function getData(listId) {
    if (isNaN(listId)) {
        throw new Error();
    }

    const [res, res2] = await Promise.all([
        axios.get(`http://localhost:3000/api/lists/${listId}/movies`),
        axios.get(`http://localhost:3000/api/lists/${listId}`),
    ]);

    if (res.status === 404 || res2.status === 404) {
        throw new Error("Failed to fetch data");
    }
    return [res, res2];
}

export default async function Page({ params }) {
    const session = await auth();

    if (!session && !session.user) {
        redirect("/");
    }

    const [data1, data2] = await getData(params.listId);

    return (
        <main>
            <div className="mx-auto max-w-4xl">
                <CreateForm
                    title={"New List"}
                    moviesProp={data1.data.movies.map((mv) => mv.movie)}
                    user={session.user}
                    listData={{
                        id: data2.data.id,
                        title: data2.data.title,
                        description: data2.data.description,
                    }}
                    type="edit"
                ></CreateForm>
            </div>
        </main>
    );
}
