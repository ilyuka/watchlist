interface MovieInterface {
    id: number;
    tmdbId: number;
    title: string;
    original_title: string;
    overview: string;
    release_date: Date;
    original_language: string;
    poster_path: string;
    backdrop_path: string;
}

export type { MovieInterface };
