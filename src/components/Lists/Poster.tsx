import Image from "next/image";

interface props {
    title?: string;
    path?: string;
    index: number;
}

export default function Poster({ title, path, index }: props) {
    const baseStyle =
        "h-full flex items-center justify-center text-center italic text-xs text-gray-400 bg-gray-900";
    const imageStyle = `h-full transform-gpu translate-x-${index * 15} z-${5 - index} bg-gray-900 overflow-clip rounded-sm shadow-2xl border border-gray-300/20`;

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
        <div key={index} className={baseStyle}>
            <Image
                className={imageStyle}
                src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${path}`}
                alt={title}
                height={80}
                width={60}
                style={{ objectFit: "fill" }}
            />
        </div>
    );
}
