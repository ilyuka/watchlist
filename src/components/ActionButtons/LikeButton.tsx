import Heart from "../svgs/Heart";

export default function LikeButton({ handleClick, size, liked }) {
    return (
        <button
            title={liked ? "Unlike movie" : "Like movie"}
            onClick={(e) => handleClick(e)}
        >
            <Heart
                size={size}
                fill={liked ? "#fb923c" : "#d1fae5"}
                color={"none"}
            ></Heart>
        </button>
    );
}
