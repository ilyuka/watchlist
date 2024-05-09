import Image from "next/image";

interface props {
    title?: string;
    path?: string;
    index: number;
}

export default function Poster({ title, path, index }: props) {
    const baseStyle =
        "h-full flex items-center justify-center text-center italic text-xs text-gray-400 bg-gray-900";
    const imageStyle = `transform-gpu translate-x-${index * 15} z-${5 - index} h-24 w-15 bg-gray-900 overflow-clip rounded-sm shadow-2xl`;

    if (!title) {
        return <div className={`${baseStyle} border border-gray-300/10`}></div>;
    }

    if (!path) {
        return (
            <div className={`${baseStyle} border border-gray-300/20`}>
                <p>{title}</p>
            </div>
        );
    }

    return (
        <div key={index} className={imageStyle}>
            <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${path}`}
                alt={title}
                height={90}
                width={60}
            />
        </div>
    );
}
