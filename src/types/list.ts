import type { MovieInterface } from "./movie";

interface ListInterface {
    id: number;
    isWatchlist: boolean;
    userId: number;
    title: string;
    description: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
    movies?: MovieInterface[]
}

export type { ListInterface };
