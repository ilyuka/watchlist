import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/../prisma/prisma";
import { validateUsername, validatePasswords } from "@/helpers/validators";

export async function POST(req: Request, res: Response) {
    try {
        console.log("here reached");
        const payload = await req.json();
        const username = payload.username.trim().toLowerCase();
        const password1 = payload.password1;
        const password2 = payload.password2;

        // validate username and passwords
        const usernameErros = validateUsername(username);
        const [password1Errors, password2Errors] = validatePasswords(
            password1,
            password2,
        );
        if (
            usernameErros.length ||
            password1Errors.length ||
            password2Errors.length
        ) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "",
                    errors: {
                        username: usernameErros,
                        password1: password1Errors,
                        password2: password2Errors,
                    },
                },
                { status: 400 },
            );
        }

        // check if user already exists
        const userExists = await prisma.user.findFirst({
            where: { username: username },
        });
        if (userExists) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "",
                    errors: {
                        username: ["User already exists"],
                        password1: [],
                        password2: [],
                    },
                },
                { status: 400 },
            );
        }

        const transaction = await prisma.$transaction(async () => {
            const hashedPassword = await bcrypt.hash(password1, 10);

            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                },
            });

            const watchlist = await prisma.list.create({
                data: {
                    isWatchlist: true,
                    userId: user.id,
                    title: `watchlist_${user.username}`,
                },
            });
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    watchlistId: watchlist.id,
                },
            });

            return { user, watchlist };
        });

        return NextResponse.json(
            { status: 201, message: "User registered!", errors: null },
            { status: 201 },
        );
    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json(
            {
                status: 400,
                message: "An error occured while registering the user",
                errors: null,
            },
            {
                status: 400,
            },
        );
    }
}
