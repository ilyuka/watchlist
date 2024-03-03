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
