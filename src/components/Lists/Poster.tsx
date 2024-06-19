import Image from "next/image";

interface props {
    title?: string;
    path?: string;
    index?: number;
    height: number;
    width: number;
}

export default function Poster({
    title,
    path,
    index = 0,
    height,
    width,
}: props) {
    const baseStyle =
        "h-full w-full flex items-center justify-center text-center italic text-sm text-gray-400 bg-gray-900";
    const imageStyle = `h-full transform-gpu translate-x-${index * 15} z-${5 - index} bg-gray-900 overflow-clip rounded-md shadow-2xl border border-gray-300/20`;

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
        <div key={path} className={baseStyle}>
            <Image
                className={imageStyle}
                src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${path}`}
                alt={title}
                height={height}
                width={width}
                style={{ objectFit: "fill" }}
            />
        </div>
    );
}
