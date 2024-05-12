import Image from "next/image";
import "./backdropStyles.css";

export default function BackdropPoster({ backdrop_path, base64 }) {
    return (
        <div className="wrapper">
            <Image
                className="poster"
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                width={1200}
                height={500}
                alt={"image large poster"}
                placeholder="blur"
                blurDataURL={base64}
            ></Image>
            <div className="cover"></div>
        </div>
    );
}
