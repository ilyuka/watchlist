"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { createList } from "@/services/listService";
import Form from "@/components/ListForm/Form";
import { useState, createContext } from "react";
import SearchField from "@/components/SearchField/SearchField";

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

    const handleClick = (e: Event) => {
        console.log(e);
    };

    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
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
                    <SearchField handleClick={handleClick}></SearchField>
                    <div>
                        {movies.map((movie) => (
                            <p key={movie}>{movie}</p>
                        ))}
                    </div>
                </div>
            </main>
        </MoviesContext.Provider>
    );
}
