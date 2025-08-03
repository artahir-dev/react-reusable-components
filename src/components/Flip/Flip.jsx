import "./Flip.css";

function Flip({
  style,
  perspective,
  perspectiveOrigin,
  transition,
  transformStyle,
  front,
  back,
}) {
  return (
    <div
      style={{
        ...style,
        perspective,
        perspectiveOrigin,
      }}
      className="flip__container"
    >
      <div className="flip"
        style={{
          transition,
          transformStyle,
        }}
      >
        <div className="flip__front">
          {front}
        </div>
        <div className="flip__back">
          {back}
        </div>
      </div>
    </div>
  );
}

export default Flip;
