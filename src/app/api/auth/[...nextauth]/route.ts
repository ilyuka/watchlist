import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/../prisma/prisma";
import bcrypt from "bcryptjs";

import { config } from "@/helpers/auth";

const authOptions = {
    // providers: [
    //     CredentialsProvider({
    //         name: "credentials",
    //         credentials: {
    //             username: {},
    //             password: {},
    //         },
    //         async authorize(credentials, req) {
    //             const username = credentials?.username;
    //             const password = credentials?.password;
    //             try {
    //                 const user = await prisma.user.findUnique({
    //                     where: {
    //                         username: username,
    //                     },
    //                 });
    //                 if (!user) {
    //                     return null;
    //                 }
    //                 const passwordsMatch = await bcrypt.compare(
    //                     password || "",
    //                     user.password,
    //                 );
    //                 if (!passwordsMatch) {
    //                     return null;
    //                 }
    //                 return {
    //                     id: user.id,
    //                     username: user.username,
    //                 };
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         },
    //     }),
    // ],
    // session: {
    //     strategy: "jwt",
    //     jwt: true,
    // },
    // secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
    // callbacks: {
    //     async session({ session, token }) {
    //         session.user = token.user;
    //         return session;
    //     },
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.user = user;
    //         }
    //         return token;
    //     },
    // },
};

// const handler = NextAuth(authOptions);
const handler = NextAuth(config);

export { handler as GET, handler as POST, authOptions };
