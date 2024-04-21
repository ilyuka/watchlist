import EditForm from "./EditForm";
const axios = require("axios").default;

import { auth } from "@/helpers/auth";

async function getData(listId) {
    if (isNaN(listId)) {
        throw new Error();
    }
    const res = await axios.get(`http://localhost:3000/api/lists/${listId}`);
    if (res.status === 404) {
        throw new Error("Failed to fetch data");
    }
    return res;
}

export default async function Page({ params }) {
    const listId = params.listId;
    const data = await getData(listId);
    const list = data.data;
    const session = await auth();
    console.log("SESSION NEW", session);
    console.log("LIST", data);
    // return <EditForm list={list} />;
    return <div>123</div>;
}
