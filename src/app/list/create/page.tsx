"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { createList } from "@/services/listService";
import Form from "@/components/ListForm/Form";
import { useState, createContext, useContext } from "react";
import Movies from "@/components/ListForm/Movies";
import { NotificationsContext } from "@/components/Notifications";
import { useSession } from "next-auth/react";

export const MoviesContext = createContext({
    movies: [],
    setMovies: () => {},
});

export default function Page() {
    const session = useSession();
    const user = session?.data?.user || { id: -1, usename: "" };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [movies, setMovies] = useState([]);

    const { notify } = useContext(NotificationsContext);

    const addMovie = (e: Event, movie) => {
        if (movies.length === 1024) {
            notify("List can't be longer than 1024 movies!");
            return;
        }
        console.log(movies);

        const inTheList = movies.some((mv) => mv.id === movie.id);
        if (!inTheList) {
            setMovies([
                ...movies,
                {
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    original_title: movie.original_title,
                    overview: movie.overview,
                    original_language: movie.original_language,
                },
            ]);
        } else {
            notify("This movie is already in the list!");
        }
    };

    const deleteMovie = (movieId) => {
        setMovies(movies.filter((mv) => mv.id !== movieId));
    };

    const moviesAreValid = () => {
        if (movies.length === 0) {
            notify("List can't be empty!");
            return false;
        }
        return true;
    };

    return (
        <MoviesContext.Provider value={{ movies, addMovie }}>
            <main>
                <div className="mx-auto max-w-4xl ">
                    <Form
                        title={"New List"}
                        onSubmit={(data: FieldValues) => {
                            if (!moviesAreValid()) {
                                return;
                            }
                            createList(data, user, movies);
                        }}
                    ></Form>
                    <Movies movies={movies} deleteMovie={deleteMovie} />
                </div>
            </main>
        </MoviesContext.Provider>
    );
}
