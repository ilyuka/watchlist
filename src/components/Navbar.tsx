import Logo from "@/components/svgs/Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/Logout";
import Link from "next/link";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    console.log("session:___", session);

    return (
        <nav className="w-screen px-4 py-4 flex justify-between max-w-4xl mx-auto">
            <div>
                <Logo height={35} width={200}></Logo>
            </div>
            <div className="flex items-center gap-6 mr-12 uppercase font-bold">
                <p>Films</p>
                <p>Lists</p>
                {!!session && (
                    <div className="flex gap-6">
                        <p>{session.user.username}</p>
                        <Logout />
                    </div>
                )}
                {!session && <Link href="/login">SIGN IN</Link>}
            </div>
        </nav>
    );
}
