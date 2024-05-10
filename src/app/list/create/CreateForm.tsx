"use client";
import FormTitle from "@/components/ListForm/FormTitle";
import { useState, useReducer, useContext } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Input from "@/components/ListForm/Input";
import Textarea from "@/components/ListForm/Textarea";
import Link from "next/link";
import Movies from "@/components/ListForm/Movies";
import SearchField from "@/components/SearchField/SearchField";
import { createList } from "@/actions/listForm";
import { NotificationsContext } from "@/components/Notifications";
import { useRouter } from "next/navigation";
import { moviesReducer } from "@/helpers/reducers/moviesReducer";

export default function Form({ title, moviesProp, user }) {
    const router = useRouter();
    const { notify } = useContext(NotificationsContext);
    const [movies, dispatchMovies] = useReducer(moviesReducer, moviesProp);
    console.log("MOVIES", movies);
    const methods = useForm();

    const moviesAreValid = () => {
        if (movies.length === 0) {
            notify("List can't be empty!");
            return false;
        }
        return true;
    };

    const addMovie = (e: Event, movie) => {
        if (movies.length === 1024) {
            notify("List can't be longer than 1024 movies!");
            return;
        }

        const inTheList = movies.some((mv) => mv.id === movie.id);
        if (!inTheList) {
            dispatchMovies({
                type: "addMovie",
                newMovie: {
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    original_title: movie.original_title,
                    overview: movie.overview,
                    original_language: movie.original_language,
                },
            });
        } else {
            notify("This movie is already in the list!");
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(async (data) => {
                    console.log("here");
                    if (!moviesAreValid()) {
                        return;
                    }
                    await createList(data, user, movies);
                    notify("List has been successfully created!");
                    router.push(`/${user.username}/lists`);
                })}
                className="max-w-4xl"
            >
                <FormTitle title={title}></FormTitle>
                <fieldset className="grid grid-cols-2 gap-16">
                    <div>
                        <Input
                            name="title"
                            label="Name"
                            type="text"
                            placeholder="My List"
                            validationParams={{
                                required: "Name is required.",
                                maxLength: {
                                    value: 50,
                                    message:
                                        "Name can't be longer than 50 characters.",
                                },
                                minLength: {
                                    value: 5,
                                    message:
                                        "Name can't be shorter than 5 characters.",
                                },
                            }}
                        ></Input>
                    </div>
                    <div>
                        <Textarea
                            name="description"
                            label="Description"
                            rows={5}
                            cols={35}
                            placeholder="My personal collection"
                            validationParams={{
                                maxLength: {
                                    value: 150,
                                    message:
                                        "Description can't be longer than 150 characters.",
                                },
                            }}
                        ></Textarea>
                    </div>
                </fieldset>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <button>
                            <Link
                                href={
                                    user.username
                                        ? `/${user.username}/lists`
                                        : "/dashboard"
                                }
                            >
                                Cancel
                            </Link>
                        </button>
                        <input
                            className="cursor-pointer"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </div>
                <SearchField
                    handleClick={(e, movie) => {
                        addMovie(e, movie);
                    }}
                ></SearchField>
                <Movies
                    movies={movies}
                    dispatchMovies={dispatchMovies}
                ></Movies>
            </form>
        </FormProvider>
    );
}
