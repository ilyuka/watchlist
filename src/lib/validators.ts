const usernameRegex = /^[0-9a-z_]{0,}$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-?;:]{0,}$/;

export function validateUsername(username: string): string[] {
    const errors: string[] = [];

    if (!username || typeof username !== "string") {
        return ["Username is required"];
    }

    if (username.length < 4) {
        errors.push("Username is too short.");
    } else if (username.length > 16) {
        errors.push("Username is too long.");
    }

    if (!usernameRegex.test(username)) {
        errors.push(
            "Username can only contain lowercase english letters, numbers and underscores.",
        );
    }

    return errors;
}

export function validatePasswords(
    password1: string,
    password2: string,
): string[][] {
    const password1Errors: string[] = [];
    const password2Errors: string[] = [];

    if (!password1 || typeof password1 !== "string") {
        return [["Password is required."], []];
    }

    if (password1.length < 8) {
        password1Errors.push("Password is too short");
    } else if (password1.length > 100) {
        password1Errors.push("Password is too long.");
    }

    if (!passwordRegex.test(password1)) {
        password1Errors.push(
            "Password can only contain english letters, numbers and (a-zA-Z0-9!@#$%^&*()_+-?;:)",
        );
    }

    if (
        !password2 ||
        typeof password2 !== "string" ||
        password2 !== password1
    ) {
        password2Errors.push("Passwords must match.");
    }

    return [password1Errors, password2Errors];
}
