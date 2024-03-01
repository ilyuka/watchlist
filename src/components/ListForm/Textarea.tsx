import { useFormContext } from "react-hook-form";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    cols: number;
    rows: number;
    validationParams: {
        maxLength: { value: number; message: string };
    };
};

export default function Textarea({
    name,
    label,
    placeholder,
    cols,
    rows,
    validationParams,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <label htmlFor="description" className="text-cyan-100">
                {label}
            </label>
            <textarea
                className="text-stone-900"
                id={name}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                {...register(name, validationParams)}
            ></textarea>
            <p>{errors[name]?.message?.toString()}</p>
        </div>
    );
}
