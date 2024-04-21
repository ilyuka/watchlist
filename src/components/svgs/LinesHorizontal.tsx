import React from "react";
const LinesHorizontal = ({ size = 24, color = "#000000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* <path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3" /> */}
        <path d="M21 10.5H3M21 3.5H3M21 17.5H3M21" />
    </svg>
);
export default LinesHorizontal;
