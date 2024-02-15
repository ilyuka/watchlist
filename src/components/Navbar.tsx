import Logo from "@/components/svgs/Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/Logout";
import Link from "next/link";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    console.log("session:___", session);
    const username = session?.user.username;

    return (
        <nav className="w-screen bg-slate-950/20">
            <div className="mx-auto flex max-w-4xl justify-between px-4 py-4">
                <div>
                    <Link href="/">
                        <Logo height={35} width={200}></Logo>
                    </Link>
                </div>
                <div className="mr-12 flex items-center gap-6 font-bold uppercase">
                    <p>Films</p>
                    <p>Lists</p>
                    {!!session && (
                        <div className="flex gap-6">
                            <Link href={"/" + username + "/lists"}>
                                {username}
                            </Link>
                            <Logout />
                        </div>
                    )}
                    {!session && <Link href="/login">SIGN IN</Link>}
                </div>
            </div>
        </nav>
    );
}
