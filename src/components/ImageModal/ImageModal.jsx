import { useState } from "react";
import "./ImageModal.css";

function ImageModal({
  src,
  alt,
  style,
  imgStyle,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const onOverlayClick = (e) => {
    if (e.target.classList.contains("image-modal__overlay")) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="image-modal__container"
      style={{
        ...style,
      }}
    >
      <img 
        className={`image-modal__image ${modalOpen ? "in-modal" : ""}`} 
        src={src} 
        alt={alt} 
        style={{ ...imgStyle }} 
        onClick={() => !modalOpen && setModalOpen(true)}
      />
      <div 
        className={`image-modal__overlay ${modalOpen ? "open" : ""}`}
        onClick={onOverlayClick}
      >
        <div 
          className="image-modal__close-button"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
