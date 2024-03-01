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
            if (!username || !password) {
                setCustomError("All fields are necessary.");
                return;
            }
            const res = await signIn("credentials", {
                username: username,
                password: password,
                redirect: false,
            }); // "credentials" - name of provider

            if (!res) {
                setCustomError("Server error, try again later.");
                return;
            }
            if (res.error) {
                setCustomError("Invalid credentials.");
                return;
            }

            router.push("/");
            router.refresh(); // to clear the router cache ????
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="pb- overflow-hidden rounded-3xl border-2 border-solid
border-gray-500 bg-slate-800"
        >
            <div className="z-10 bg-gray-900/70 pb-12 pt-8">
                <h1 className="text-center text-3xl font-bold">Sign In</h1>
            </div>
            <div className="relative z-20 -translate-y-5 rounded-3xl bg-slate-800 px-8 pt-14">
                <form
                    onSubmit={handleSubmit}
                    className="text flex flex-col gap-7 text-black"
                >
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
                        <div className="text-sm text-red-300">
                            {customError}
                        </div>
                    )}
                    <button className="mt-12 cursor-pointer rounded-xl border border-slate-400/40 bg-teal-950 py-2 font-bold">
                        Sign In
                    </button>
                    <Link
                        className="text-center text-sm underline"
                        href="/register"
                    >
                        {"Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </div>
    );
}
