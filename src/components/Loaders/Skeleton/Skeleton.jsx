import "./Skeleton.css";

function Skeleton({
  width = "100%",
  height = "100%",
  borderRadius = "0px",
  backgroundColor = "#f0f0f0",
  shimmerColor = "#e0e0e0",
  style,
  speed,
}) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        ...style,
      }}
    >
      <div 
        className="skeleton__shimmer-element"
        style={{
          animationDuration: speed,
          backgroundImage: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            ${shimmerColor} 50%,
            rgba(255, 255, 255, 0) 100%
          )`,
        }}
      ></div>
    </div>
  );
};
export default Skeleton; 
 