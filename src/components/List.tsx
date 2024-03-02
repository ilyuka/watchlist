"use client";
import Image from "next/image";
import Edit from "./svgs/Edit";
import Heart from "./svgs/Heart";
export default function List({ list, movies, length, lastIndex, isOwner }) {
    // console.log("IMAGEURLS", imageUrls);
    console.log("LIST", list);
    console.log(typeof length, "TYPE OF LENGTH");
    return (
        <div
            className={`border border-cyan-100/40 px-2 py-4 ${lastIndex === false ? "border-b-transparent" : ``} `}
        >
            <div className="flex items-center">
                <div className="flex">
                    {Array(5)
                        .fill(null)
                        .map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        transform: `translateX(-${index * 15}%)`,
                                        // marginRight: `-${index * 15}px`,
                                        zIndex: `${5 - index}`,
                                        height: "98px",
                                        width: "60px",
                                        backgroundColor: "#1c1c1c",
                                    }}
                                    className="overflow-clip rounded-sm shadow-2xl"
                                >
                                    {index < length &&
                                    movies[index].posterPath ? (
                                        <Image
                                            style={{
                                                height: "100%",
                                            }}
                                            src={`https://image.tmdb.org/t/p/original/${movies[index].posterPath}`}
                                            alt={movies[index].title}
                                            height={90}
                                            width={60}
                                        ></Image>
                                    ) : index < length &&
                                      !movies[index].posterPath ? (
                                        <div
                                            className="border border-gray-300/20"
                                            style={{
                                                height: "100%",
                                                backgroundColor: "#1c1c1c",
                                                color: "#cbd5e1",
                                                fontSize: "0.735em",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            <p>{movies[index].title}</p>
                                            <p>
                                                (
                                                {
                                                    movies[
                                                        index
                                                    ].releaseDate.split("-")[0]
                                                }
                                                )
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="h-full border border-gray-300/10"></div>
                                    )}
                                </div>
                            );
                        })}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">{list.title}</div>
                        {isOwner && (
                            <div>
                                <Edit size={16} color={"#ffffff"}></Edit>
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-gray-400">
                        <div>{length} movies</div>
                        <div className="flex items-center gap-1">
                            {list.likesCount}{" "}
                            <Heart
                                size={13}
                                fill={"#9ca3af"}
                                color={"none"}
                            ></Heart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
