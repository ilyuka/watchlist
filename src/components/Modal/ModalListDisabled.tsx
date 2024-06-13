import { SVGProps } from "react";

export default function ModalListDisabled({ list }) {
    return (
        <div className="flex items-center border-t-2 border-t-neutral-700 px-4 py-2">
            <MaterialSymbolsFitbitCheckSmallSharp
                width={"24"}
                height={"24"}
                className={"mr-4 text-gray-400"}
            ></MaterialSymbolsFitbitCheckSmallSharp>
            <span className="text-gray-400">{list.title}</span>
            <span className="ml-auto text-sm text-gray-400">
                {list._count.movies} movies
            </span>
        </div>
    );
}

export function MaterialSymbolsFitbitCheckSmallSharp(
    props: SVGProps<SVGSVGElement>,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="m10.5 16.2l-4-4l1.4-1.4l2.6 2.6l5.6-5.6l1.4 1.4Z"
            ></path>
        </svg>
    );
}
