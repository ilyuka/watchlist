"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function MyQueryClientProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={false}
                client={queryClient}
            ></ReactQueryDevtools>
        </QueryClientProvider>
    );
}
