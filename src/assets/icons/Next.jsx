export default function Next({
  size,
  fill,
  stroke,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "24"}
      height={size || "24"}
      fill={fill || "none"}
      viewBox="0 0 24 24"
      stroke={stroke || "currentColor"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}