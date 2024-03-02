"use client";
import Image from "next/image";
import Heart from "./svgs/Heart";
import Eye from "./svgs/Eye";
import DotsHorizontal from "./svgs/DotsHorizontal";
import { useState } from "react";
import MoreOptions from "./MoreOptions";

export default function Movie({ movie }) {
    const [showOptions, setShowOptions] = useState(false);

    const showMoreOptions = () => {
        setShowOptions(true);
    };
    const hideMoreOptions = () => {
        setShowOptions(false);
    };

    const SVG_FILL_COLOR = "#ecfeff";
    return (
        <div className="movie-poster relative flex flex-col items-center rounded-sm">
            <div>
                <Image
                    style={{
                        height: "100%",
                    }}
                    src={`https://image.tmdb.org/t/p/original/${movie.movie.posterPath}`}
                    alt={movie.movie.title}
                    height={188}
                    width={125}
                ></Image>
            </div>

            <ul className="options">
                <li>
                    <button title="Add to liked">
                        <Heart
                            size={22}
                            fill={SVG_FILL_COLOR}
                            color={"none"}
                        ></Heart>
                    </button>
                </li>

                <li>
                    <button title="Add to watchlist">
                        <Eye
                            size={22}
                            fill={"none"}
                            color={SVG_FILL_COLOR}
                        ></Eye>
                    </button>
                </li>
                <li>
                    <button title="More options" onClick={showMoreOptions}>
                        <DotsHorizontal
                            size={24}
                            fill={"none"}
                            color={SVG_FILL_COLOR}
                        ></DotsHorizontal>
                    </button>
                </li>
            </ul>
            {showOptions && <MoreOptions hide={hideMoreOptions}></MoreOptions>}
        </div>
    );
}
