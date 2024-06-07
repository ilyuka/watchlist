import type { ListInterface } from "@/types/list";
import ListPreview from "@/components/Lists/ListPreview";

export default function Lists({
    lists,
    isOwner,
    listOwner,
}: {
    lists: ListInterface[];
    user: { id: number; username: string };
    isOwner: boolean;
}) {
    if (lists.length === 0) {
        return <div> no lists </div>;
    }
    return (
        <div className="my-4">
            {lists.map((list, index) => {
                return (
                    <ListPreview
                        key={list.id}
                        list={list}
                        isOwner={isOwner}
                        lastIndex={index === lists.length - 1}
                    ></ListPreview>
                );
            })}
        </div>
    );
}
