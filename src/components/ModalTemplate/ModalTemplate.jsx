import "./ModalTemplate.css";

export default function ModalTemplate({
  children,
  style,
}) {
  return (
    <div className="modal-template" style={style}>
      {children}
    </div>
  );
}  