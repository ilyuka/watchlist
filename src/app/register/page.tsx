import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return (
        <main>
            <RegisterForm></RegisterForm>
        </main>
    );
}
