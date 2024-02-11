"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Form() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [customError, setCustomError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                username: username,
                password: password,
                redirect: false,
            }); // "credentials" - name of provider

            if (res.error) {
                setCustomError("Invalid credentials");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="shadow-lg border-2 border-solid border-gray-500 pb-4
rounded-3xl bg-slate-800 overflow-hidden"
        >
            <div className="bg-gray-900/70 pt-8 pb-12 z-10">
                <h1 className="text-3xl font-bold text-center">Sign In</h1>
            </div>
            <div className="px-8 pt-14 bg-slate-800 relative -translate-y-5 z-20 rounded-3xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    {customError && (
                        <div className="text-red-300 text-sm">
                            {customError}
                        </div>
                    )}
                    <button className="bg-teal-950 py-2 font-bold rounded-xl border border-slate-400/40 mt-12 cursor-pointer">
                        Sign In
                    </button>
                    <Link
                        className="text-sm text-center underline"
                        href="/register"
                    >
                        {"Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </div>
    );
}
