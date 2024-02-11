import Link from "next/link";
import { getAllLists } from "@/services/listService";
import SearchField from "@/components/SearchField";
import UserInfo from "@/components/UserInfo";

export default async function Home() {
    const allLists = await getAllLists();

    return (
        <main>
            <UserInfo></UserInfo>
            <Link href="/list/create">Create New List</Link>
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
