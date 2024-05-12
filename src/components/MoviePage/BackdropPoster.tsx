import Image from "next/image";

export default function BackdropPoster({ backdrop_path, base64 }) {
    console.log("base64", base64);
    return (
        <div
            style={{
                backgroundPosition: "center -15px",
                position: "relative",
                height: "675px",
                width: "1200px",
            }}
        >
            <Image
                priority
                style={{
                    width: "1200px",
                    height: "675px",
                    position: "absolute",
                }}
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                width={1200}
                height={500}
                alt={"image large poster"}
                placeholder="blur"
                blurDataURL={base64}
            ></Image>
            <div
                style={{
                    paddingTop: "500px",
                    position: "relative",
                    height: "675px",
                    // backgroundImage:
                    //     "linear-gradient(90deg, #14181d 0, rgba(20, 24, 29, .986) .97%, rgba(20, 24, 29, .945) 2.07833333%, rgba(20, 24, 29, .883) 3.29666667%, rgba(20, 24, 29, .803) 4.60166667%, rgba(20, 24, 29, .711) 5.96666667%, rgba(20, 24, 29, .61) 7.365%, rgba(20, 24, 29, .504) 8.77166667%, rgba(20, 24, 29, .398) 10.16%, rgba(20, 24, 29, .296) 11.505%, rgba(20, 24, 29, .203) 12.78%, rgba(20, 24, 29, .122) 13.95833333%, rgba(20, 24, 29, .059) 15.01666667%, rgba(20, 24, 29, .016) 15.92833333%, rgba(20, 24, 29, 0) 16.66666667%, rgba(20, 24, 29, 0) 83.33333333%, rgba(20, 24, 29, .016) 84.07166667%, rgba(20, 24, 29, .059) 84.98333333%, rgba(20, 24, 29, .122) 86.04166667%, rgba(20, 24, 29, .203) 87.22%, rgba(20, 24, 29, .296) 88.495%, rgba(20, 24, 29, .398) 89.84%, rgba(20, 24, 29, .504) 91.22833333%, rgba(20, 24, 29, .61) 92.635%, rgba(20, 24, 29, .711) 94.03333333%, rgba(20, 24, 29, .803) 95.39833333%, rgba(20, 24, 29, .883) 96.70333333%, rgba(20, 24, 29, .945) 97.92166667%, rgba(20, 24, 29, .986) 99.03%, #14181d), linear-gradient(0deg, #14181d 0, #14181d 21.48148148%, rgba(20, 24, 29, .986) 23.63703704%, rgba(20, 24, 29, .945) 26.1%, rgba(20, 24, 29, .883) 28.80740741%, rgba(20, 24, 29, .803) 31.70740741%, rgba(20, 24, 29, .711) 34.74074074%, rgba(20, 24, 29, .61) 37.84814815%, rgba(20, 24, 29, .504) 40.97407407%, rgba(20, 24, 29, .398) 44.05925926%, rgba(20, 24, 29, .296) 47.04814815%, rgba(20, 24, 29, .203) 49.88148148%, rgba(20, 24, 29, .122) 52.5%, rgba(20, 24, 29, .059) 54.85185185%, rgba(20, 24, 29, .016) 56.87777778%, rgba(20, 24, 29, 0) 58.51851852%)",
                    background:
                        "linear-gradient(90deg, rgb(20, 30, 48) 0, rgba(20, 30, 48, .986) .97%, rgba(20, 30, 48, .945) 2.07833333%, rgba(20, 30, 48, .883) 3.29666667%, rgba(20, 30, 48, .803) 4.60166667%, rgba(20, 30, 48, .711) 5.96666667%, rgba(20, 30, 48, .61) 7.365%, rgba(20, 30, 48, .504) 8.77166667%, rgba(20, 30, 48, .398) 10.16%, rgba(20, 30, 48, .296) 11.505%, rgba(20, 30, 48, .203) 12.78%, rgba(20, 30, 48, .122) 13.95833333%, rgba(20, 30, 48, .059) 15.01666667%, rgba(20, 30, 48, .016) 15.92833333%, rgba(20, 30, 48, 0) 16.66666667%, rgba(20, 30, 48, 0) 83.33333333%, rgba(20, 30, 48, .016) 84.07166667%, rgba(20, 30, 48, .059) 84.98333333%, rgba(20, 30, 48, .122) 86.04166667%, rgba(20, 30, 48, .203) 87.22%, rgba(20, 30, 48, .296) 88.495%, rgba(20, 30, 48, .398) 89.84%, rgba(20, 30, 48, .504) 91.22833333%, rgba(20, 30, 48, .61) 92.635%, rgba(20, 30, 48, .711) 94.03333333%, rgba(20, 30, 48, .803) 95.39833333%, rgba(20, 30, 48, .883) 96.70333333%, rgba(20, 30, 48, .945) 97.92166667%, rgba(20, 30, 48, .986) 99.03%, rgb(20, 30, 48)), linear-gradient(0deg, rgb(20, 30, 48) 0, rgb(20, 30, 48) 21.48148148%, rgba(20, 30, 48, .986) 23.63703704%, rgba(20, 30, 48, .945) 26.1%, rgba(20, 30, 48, .883) 28.80740741%, rgba(20, 30, 48, .803) 31.70740741%, rgba(20, 30, 48, .711) 34.74074074%, rgba(20, 30, 48, .61) 37.84814815%, rgba(20, 30, 48, .504) 40.97407407%, rgba(20, 30, 48, .398) 44.05925926%, rgba(20, 30, 48, .296) 47.04814815%, rgba(20, 30, 48, .203) 49.88148148%, rgba(20, 30, 48, .122) 52.5%, rgba(20, 30, 48, .059) 54.85185185%, rgba(20, 30, 48, .016) 56.87777778%, rgba(20, 30, 48, 0) 58.51851852%)",
                }}
            >
                background-color: red
            </div>
        </div>
    );
}
