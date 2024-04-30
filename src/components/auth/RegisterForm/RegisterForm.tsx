"use client";
import { FormEvent, useState, useContext } from "react";
import { NotificationsContext } from "@/components/Notifications";
import { useRouter } from "next/navigation";
import RegisterFormUI from "./RegisterFormUI";
const axios = require("axios").default;
import { validateUsername, validatePasswords } from "@/helpers/validators";

export default function RegisterForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [usernameErrors, setUsernameErrors] = useState<string[]>([""]);
    const [password1, setPassword1] = useState("");
    const [password1Errors, setPassword1Errors] = useState<string[]>([""]);
    const [password2, setPassword2] = useState("");
    const [password2Errors, setPassword2Errors] = useState<string[]>([""]);
    const [isLoading, setIsLoading] = useState(false);

    const { notify } = useContext(NotificationsContext);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setUsernameErrors(validateUsername(event.target.value));
    }
    function handlePassword1Change(event) {
        setPassword1(event.target.value);
        setPassword1Errors(validatePasswords(event.target.value, password2)[0]);
    }
    function handlePassword2Change(event) {
        setPassword2(event.target.value);
        setPassword2Errors(validatePasswords(password1, event.target.value)[1]);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setUsername((oldUsername) => {
            const newUsername = oldUsername;
            newUsername.trim().toLowerCase();
            return newUsername;
        });

        try {
            setUsernameErrors(validateUsername(username));
            const [p1err, p2err] = validatePasswords(password1, password2);
            setPassword1Errors(p1err);
            setPassword2Errors(p2err);

            if (
                !usernameErrors.length &&
                !password1Errors.length &&
                !password2Errors.length
            ) {
                const userExistsRequest = await axios({
                    method: "POST",
                    url: "api/userExists",
                    data: {
                        username: username,
                    },
                });

                if (userExistsRequest.data.found) {
                    setUsernameErrors(["User already exists"]);
                    return;
                }

                const registerRequest = await axios({
                    method: "POST",
                    url: "api/register",
                    data: {
                        username: username,
                        password1: password1,
                        password2: password2,
                    },
                });

                const errors = registerRequest.data.errors;
                if (registerRequest.status === 201) {
                    setUsername("");
                    setPassword1("");
                    setPassword2("");
                    notify("Registration succesful");
                    router.replace("/login");
                    router.refresh();
                } else {
                    if (!errors) {
                        throw new Error();
                    }
                    setUsernameErrors(errors.username);
                    setPassword1Errors(errors.password1);
                    setPassword2Errors(errors.password2);
                }
            } else {
                setIsLoading(false);
                return;
            }
        } catch (error) {
            notify("Something went wrong.");
            console.error("Error during user registration.", error);
        }
    };
    return (
        <RegisterFormUI
            loading={isLoading}
            usernameErrors={usernameErrors}
            password1Errors={password1Errors}
            password2Errors={password2Errors}
            onUsernameChange={handleUsernameChange}
            onPassword1Change={handlePassword1Change}
            onPassword2Change={handlePassword2Change}
            onSubmit={handleSubmit}
        ></RegisterFormUI>
    );
}
