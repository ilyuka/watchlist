"use server";
import { auth } from "@/helpers/auth";
import { redirect } from "next/navigation";
import CreateForm from "./CreateForm";

export default async function Page() {
    const session = await auth();

    if (!session && !session.user) {
        redirect("/");
    }

    return (
        <main>
            <div className="mx-auto max-w-4xl">
                <CreateForm
                    title={"New List"}
                    moviesProp={[]}
                    user={session.user}
                    listData={{ title: "", description: "" }}
                    type="create"
                ></CreateForm>
            </div>
        </main>
    );
}
