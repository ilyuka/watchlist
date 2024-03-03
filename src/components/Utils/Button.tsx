export default function Button({
    text,
    handleClick,
    bgColorClassname,
    hoverBgColorClassname = bgColorClassname,
}) {
    return (
        <button
            className={`${bgColorClassname} rounded px-3 py-2 font-bold uppercase tracking-wide text-white ${hoverBgColorClassname}`}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}
