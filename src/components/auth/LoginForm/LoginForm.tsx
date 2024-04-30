"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoginFormUI from "./LoginFormUI";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!username || !password) {
                setError("All fields are necessary.");
                return;
            }

            const res = await signIn("credentials", {
                username: username,
                password: password,
                redirect: false,
            });

            if (!res) {
                setError("Server error, try again later.");
                return;
            }

            if (res.error) {
                setError("Login or password didn't match.");
                return;
            }

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <LoginFormUI
            username={username}
            password={password}
            error={error}
            loading={isLoading}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        ></LoginFormUI>
    );
}
