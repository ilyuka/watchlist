import DotsHorizontal from "../../svgs/DotsHorizontal";

export default function DotsHorizontalButton({
    handleClick,
    size,
    fill = "none",
    color = "#ecfeff",
}) {
    return (
        <button title={"Show more options"} onClick={(e) => handleClick(e)}>
            <DotsHorizontal
                size={size}
                fill={fill}
                color={color}
            ></DotsHorizontal>
        </button>
    );
}
