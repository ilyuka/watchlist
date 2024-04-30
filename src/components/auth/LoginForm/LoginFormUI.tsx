import Link from "next/link";

const LoginFormUI = ({
    username,
    password,
    error,
    loading,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
}) => {
    return (
        <div className="grid h-screen place-items-center">
            <div
                className="overflow-hidden rounded-3xl border-2 border-solid border-gray-500
bg-slate-800"
            >
                <div className="z-10 bg-gray-900/70 pb-12 pt-8">
                    <h1 className="text-center text-3xl font-bold">Sign In</h1>
                </div>
                <div className="relative z-20 -translate-y-5 rounded-3xl bg-slate-800 px-8 pt-14">
                    <form
                        onSubmit={onSubmit}
                        className="text flex flex-col gap-7 text-black"
                    >
                        <input
                            onChange={(e) => onUsernameChange(e.target.value)}
                            type="text"
                            placeholder="Username"
                            value={username}
                        />
                        <input
                            onChange={(e) => onPasswordChange(e.target.value)}
                            type="password"
                            placeholder="Password"
                            value={password}
                        />
                        {error && (
                            <div className="text-sm text-red-300">{error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-12 cursor-pointer rounded-xl border border-slate-400/40 bg-teal-950 py-2 font-bold"
                        >
                            {loading ? "Loading..." : "Sign In"}
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
        </div>
    );
};

export default LoginFormUI;
