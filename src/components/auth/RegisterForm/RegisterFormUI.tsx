"use client";
import Link from "next/link";

export default function RegisterFormUI({
    loading,
    usernameErrors,
    password1Errors,
    password2Errors,
    onUsernameChange,
    onPassword1Change,
    onPassword2Change,
    onSubmit,
}) {
    console.log(usernameErrors);
    return (
        <div className="grid h-screen place-items-center">
            <div
                className="max-w-md overflow-hidden rounded-3xl border-2 border-solid
border-gray-500 bg-slate-800 pb-4 shadow-lg"
            >
                <div className="z-10 bg-gray-900/70 pb-12 pt-8">
                    <h1 className="text-center text-3xl font-bold">Sign Up</h1>
                </div>
                <div className="relative z-20 -translate-y-5 rounded-3xl bg-slate-800 px-8 pt-14 text-black">
                    <form onSubmit={onSubmit} className="flex flex-col gap-7">
                        <div>
                            <input
                                onChange={(e) => onUsernameChange(e)}
                                type="text"
                                placeholder="Username"
                            />
                            <div>
                                {usernameErrors.map((error) => {
                                    return (
                                        <p className="text-sm text-red-300">
                                            {error}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <input
                                onChange={(e) => onPassword1Change(e)}
                                type="password"
                                placeholder="Password"
                            />
                            {password1Errors.map((error) => {
                                return (
                                    <p className="text-sm text-red-300">
                                        {error}
                                    </p>
                                );
                            })}
                        </div>
                        <div>
                            <input
                                onChange={(e) => onPassword2Change(e)}
                                type="password"
                                placeholder="Confirm Your Password"
                            />
                            {password2Errors.map((error) => {
                                return (
                                    <p className="text-sm text-red-300">
                                        {error}
                                    </p>
                                );
                            })}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-12 cursor-pointer rounded-xl border border-slate-400/40 bg-teal-950 py-2 font-bold"
                        >
                            {loading ? "Loading..." : "Sign Up"}
                        </button>
                        <Link
                            className="text-center text-sm underline"
                            href="/login"
                        >
                            {"Have an account? Sign In"}
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
