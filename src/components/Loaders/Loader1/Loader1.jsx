import "./Loader1.css";

export default function Loader1({
  size,
  thickness,
  speed,
  primaryColor,
  secondaryColor,
}) {
  return (
    <div 
      className="loader1"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: primaryColor,
        borderTopColor: secondaryColor,
        animationDuration: speed,
      }}
    >
    </div>
  )
}