import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/../prisma/prisma";
import bcrypt from "bcryptjs";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                const username = credentials?.username;
                const password = credentials?.password;

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            username: username,
                        },
                    });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password || "",
                        user.password,
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        id: user.id,
                        username: user.username,
                        watchlistId: user.watchlistId,
                    };
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        jwt: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            // console.log("token", token);
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    }, // rest of your config
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
): Promise<{ user: { id: number; username: string; watchlistId: number } }> {
    return getServerSession(...args, config);
}
