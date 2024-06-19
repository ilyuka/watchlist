import Link from "next/link";

export default function Option({
    text,
    handleClick = () => {},
    isFirst = false,
}) {
    return (
        <li
            className={`${isFirst ? "" : "border-t border-t-stone-500"} hover:bg-stone-500`}
        >
            <button className="w-full px-4 py-3" onClick={handleClick}>
                {text}
            </button>
        </li>
    );
}

export function OptionLink({ isFirst = false, href, text, scroll = false }) {
    return (
        <li
            className={`${isFirst ? "" : "border-t border-t-stone-500"} hover:bg-stone-500`}
        >
            <Link
                href={href}
                className=" inline-block w-full px-4 py-3 text-center"
                scroll={scroll}
            >
                {text}
            </Link>
        </li>
    );
}
