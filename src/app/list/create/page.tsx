"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { createList } from "@/services/listService";
import Form from "@/components/ListForm/Form";
import { useState, createContext, useContext } from "react";
import SearchField from "@/components/SearchField/SearchField";
import Movies from "@/components/ListForm/Movies";
import { NotificationsContext } from "@/components/Notifications";

export const MoviesContext = createContext({
    movies: [],
    setMovies: () => {},
});

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [movies, setMovies] = useState([]);

    const { message, notify } = useContext(NotificationsContext);

    const addMovie = (e: Event, movie) => {
        console.log(movies);

        const inTheList = movies.some((mv) => mv.id === movie.id);
        if (!inTheList) {
            console.log(movie);
            setMovies([
                ...movies,
                {
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                },
            ]);
        } else {
            const msg = "This movie is already in the list!";
            if (message === msg) {
                notify(msg + " ");
                return;
            }
            notify(msg);
        }
    };

    const deleteMovie = (movieId) => {
        setMovies(movies.filter((mv) => mv.id !== movieId));
    };

    const [counter, setCounter] = useState(0);

    return (
        <MoviesContext.Provider value={{ movies, addMovie }}>
            <main>
                <div className="mx-auto max-w-4xl ">
                    <Form
                        title={"New List"}
                        onSubmit={(data: FieldValues) => {
                            console.log(data);
                            console.log(errors);
                            // reset();
                        }}
                    ></Form>
                    <SearchField handleClick={addMovie}></SearchField>

                    <Movies movies={movies} deleteMovie={deleteMovie} />
                </div>
            </main>
        </MoviesContext.Provider>
    );
}
