import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import MyAppProvider from "@/components/providers/MyAppProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MyAppProvider>
                    <Navbar></Navbar>
                    {children}
                    {modal}
                </MyAppProvider>
            </body>
        </html>
    );
}

export const revalidate = 0;
