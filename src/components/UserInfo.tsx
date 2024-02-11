"use client";
import { signOut } from "next-auth/react";
import { useSession, SessionProvider } from "next-auth/react";

export default function UserInfo() {
    // const { data: session } = useSession();
    // console.log("SESSION: ", session);
    return (
        <div>
            {/* <p>{session}</p> */}
            <p>welcome</p>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
                Log Out
            </button>
        </div>
    );
}
