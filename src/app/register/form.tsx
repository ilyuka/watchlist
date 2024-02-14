"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [customError, setCustomError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUsername((oldUsername) => {
            const newUsername = oldUsername;
            newUsername.trim().toLowerCase();
            return newUsername;
        });

        if (!username || !password1 || !password2) {
            setCustomError("All fields are necessary.");
            return;
        } else if (!/^[0-9a-z_]{4,16}$/.test(username)) {
            setCustomError(
                "Username should have 4-16 characters and contain only english alphabet characters, numbers and underscores.",
            );
            return;
        } else if (!/^.{8,16}$/.test(password1)) {
            setCustomError("Password should be 8-16 characters long.");
            return;
        } else if (password1 !== password2) {
            setCustomError("Passwords must match.");
            return;
        }
        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });
            const { user } = await resUserExists.json();

            if (user) {
                setCustomError("User already exists");
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password1, password2 }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/login");
                router.refresh();
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during user registration.");
            console.error(error);
        }
    };

    return (
        <div
            className="shadow-lg border-2 border-solid border-gray-500 pb-4
rounded-3xl bg-slate-800 overflow-hidden max-w-md"
        >
            <div className="bg-gray-900/70 pt-8 pb-12 z-10">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
            </div>
            <div className="px-8 pt-14 bg-slate-800 relative -translate-y-5 z-20 rounded-3xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        onChange={(e) => setPassword1(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        onChange={(e) => setPassword2(e.target.value)}
                        type="password"
                        placeholder="Confirm Your Password"
                    />
                    {customError && (
                        <div className="text-red-300 text-sm">
                            {customError}
                        </div>
                    )}
                    <button className="bg-teal-950 py-2 font-bold rounded-xl border border-slate-400/40 mt-12 cursor-pointer">
                        Sign Up
                    </button>
                    <Link
                        className="text-sm text-center underline"
                        href="/login"
                    >
                        {"Have an account? Sign In"}
                    </Link>
                </form>
            </div>
        </div>
    );
}
