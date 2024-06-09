import Eye from "../../svgs/Eye";

export default function EyeButton({ handleClick, size, inWatchlist }) {
    return (
        <button
            title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            onClick={(e) => handleClick(e)}
        >
            <Eye size={size} color={inWatchlist ? "#67e8f9" : "#d1fae5"}></Eye>
        </button>
    );
}
