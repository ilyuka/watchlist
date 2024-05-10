import Poster from "./Poster";

interface props {
    postersUrls: { title: string; path: string }[];
}

export default function ListPreviewPosters({ postersUrls }: props) {
    return (
        <div className="flex">
            {Array(5)
                .fill(null)
                .map((item, index) => {
                    const curr = postersUrls[index];
                    return (
                        <div
                            key={index}
                            style={{
                                transform: `translateX(-${index * 15}%)`,
                                zIndex: `${5 - index}`,
                                height: "90px",
                                width: "60px",
                                backgroundColor: "#1c1c1c",
                            }}
                            className="overflow-clip rounded-sm shadow-2xl"
                        >
                            <Poster
                                key={index}
                                title={curr?.title}
                                path={curr?.path}
                                index={index}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
