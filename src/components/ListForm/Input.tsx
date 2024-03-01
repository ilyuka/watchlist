import { useFormContext } from "react-hook-form";

type Props = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    validationParams: {
        required: boolean | string;
        maxLength: { value: number; message: string };
        minLength: { value: number; message: string };
    };
};

export default function Input({
    name,
    label,
    type,
    placeholder,
    validationParams,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-cyan-100">
                {label}
            </label>
            <input
                className="text-stone-900"
                type={type}
                id={name}
                placeholder={placeholder}
                {...register(name, validationParams)}
            />
            <p>{errors[name]?.message?.toString()}</p>
        </div>
    );
}
