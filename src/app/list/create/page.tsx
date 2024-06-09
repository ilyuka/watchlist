import { getCurrentUser } from "@/lib/auth/getUser";
import { redirect } from "next/navigation";
import CreateForm from "./CreateForm";

export default async function Page() {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id || !currentUser.username) {
        redirect("/");
    }

    return (
        <main>
            <div className="mx-auto max-w-4xl">
                <CreateForm
                    title={"New List"}
                    moviesProp={[]}
                    user={currentUser}
                    listData={{ title: "", description: "" }}
                    type="create"
                ></CreateForm>
            </div>
        </main>
    );
}
