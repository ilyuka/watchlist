import Logo from "@/components/svgs/Logo";
import Logout from "./Logout";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";

export default async function Navbar() {
    const session = await auth();
    const username = session?.user.username;

    return (
        <nav className="relative z-10 w-screen bg-slate-950/20">
            <div className="mx-auto flex max-w-4xl justify-between px-4 py-4">
                <div>
                    <Link href="/">
                        <Logo height={35} width={200}></Logo>
                    </Link>
                </div>
                <div className="mr-12 flex items-center gap-6 font-bold uppercase">
                    <p className="cursor-pointer hover:text-slate-400">Films</p>
                    <p className="cursor-pointer hover:text-slate-400">Lists</p>
                    {!!session && (
                        <div className="flex gap-6">
                            <Link
                                className="cursor-pointer hover:text-slate-400"
                                href={"/" + username + "/lists"}
                            >
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
