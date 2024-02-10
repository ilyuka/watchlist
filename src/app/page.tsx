import Link from "next/link";
import { getAllLists } from "@/services/listService";
import SearchField from "@/components/SearchField";

export default async function Home() {
    const allLists = await getAllLists();

    // fetch all lists
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/list/create" className="border border-white px-4 py-2">
                Create New List
            </Link>
            <div>
                <ul>
                    {allLists?.map((list, index) => {
                        return <li key={index}>{list.title}</li>;
                    })}
                </ul>
            </div>
            <div>
                <SearchField></SearchField>
            </div>
        </main>
    );
}
