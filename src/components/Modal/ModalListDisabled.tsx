import { MaterialSymbolsFitbitCheckSmallSharp } from "../svgs/CheckSmallSharp";

export default function ModalListDisabled({ list }) {
    return (
        <div className="flex items-center border-t border-t-slate-700 px-4 py-2">
            <MaterialSymbolsFitbitCheckSmallSharp
                width={"30"}
                height={"30"}
                className={"mr-4 text-gray-400"}
            ></MaterialSymbolsFitbitCheckSmallSharp>
            <span className="text-gray-400">{list.title}</span>
            <span className="ml-auto text-sm text-gray-400">
                #{list.movies[0].positionOnTheList + 1} of {list._count.movies}
            </span>
        </div>
    );
}
