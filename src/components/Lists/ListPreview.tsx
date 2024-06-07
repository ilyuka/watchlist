import Edit from "@/components/svgs/Edit";
import Heart from "@/components/svgs/Heart";
import Link from "next/link";
import type { ListInterface } from "@/types/list";
import ListPreviewPosters from "./ListPreviewPosters";

type ListPreviewProps = {
    list: ListInterface;
    isOwner: boolean;
    lastIndex: boolean;
};

export default function ListPreview({
    list,
    isOwner,
    lastIndex,
}: ListPreviewProps) {
    return (
        <div
            className={`border border-cyan-100/40 px-2 py-4 ${lastIndex === false ? "border-b-transparent" : ``} `}
        >
            <div className="flex items-center">
                <ListPreviewPosters
                    postersUrls={list.movies.map((mv) => {
                        return { title: mv.movie.title, path: mv.movie.poster_path };
                    })}
                ></ListPreviewPosters>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">
                            <Link href={`/list/${list.id}`}>{list.title}</Link>
                        </div>
                        {isOwner && (
                            <Link href={`/list/${list.id}/edit`}>
                                <Edit size={16} color={"#ffffff"}></Edit>
                            </Link>
                        )}
                    </div>
                    <div className="text-xs text-gray-400">
                        <div>
                            {list.movies.length === 1
                                ? `${list.movies.length} movie`
                                : `${list.movies.length} movies`}
                        </div>
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
