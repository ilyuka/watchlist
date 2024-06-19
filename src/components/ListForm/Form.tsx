import FormTitle from "./FormTitle";
import {
    useForm,
    FormProvider,
    useFormContext,
    SubmitHandler,
    FieldValues,
} from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import { useContext } from "react";
import { MoviesContext } from "@/app/list/create/page";
import SearchField from "@/components/SearchField/SearchField";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
    title: string;
    onSubmit: Function;
};

export default function Form({ title, onSubmit }: Props) {
    const session = useSession();
    const username = session?.data?.user?.username || "";
    const { addMovie } = useContext(MoviesContext);
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => {
                    onSubmit(data);
                    // methods.reset();
                })}
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
                    <SearchField handleClick={addMovie}></SearchField>
                    <div className="flex gap-4">
                        <button>
                            <Link
                                href={
                                    username
                                        ? `/${username}/lists`
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
            </form>
        </FormProvider>
    );
}
