"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { createList } from "@/services/listService";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit((data) => {
                        createList(data);
                    })}
                >
                    <label htmlFor="title">
                        List Title
                        <input
                            type="text"
                            {...register("title", {
                                required: "Please input name of your list",
                            })}
                            id="title"
                            className="text-black"
                        />
                        <p>{errors.title?.message?.toString()}</p>
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea
                            {...register("description")}
                            id="description"
                            cols={30}
                            rows={10}
                            className="text-black"
                        ></textarea>
                        <p>{errors.description?.message?.toString()}</p>
                    </label>
                    <input type="submit" value="Create List" />
                </form>
            </div>
        </main>
    );
}
