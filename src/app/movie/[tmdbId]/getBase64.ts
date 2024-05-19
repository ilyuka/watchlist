"use server";
import { getPlaiceholder } from "plaiceholder";
import axios from "axios";

export default async function getBase64(backdrop_path) {
    const src = `${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}/${backdrop_path}`;

    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
    );

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
}
