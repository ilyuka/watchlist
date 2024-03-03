import { getListMovies } from "@/services/listService";

export default async function Page({ params }) {
    const listId = params.listId;
    const moviesFromList = await getListMovies(Number(listId));
    console.log("MOVIES FROM LIST", moviesFromList);
    return <div>{listId}</div>;
}
