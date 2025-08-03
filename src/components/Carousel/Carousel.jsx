import { useEffect, useRef } from "react";
import "./Carousel.css";

export default function Carousel({
  children,
  style,
  btnStyle,
  prevBtnContent = "<",
  nextBtnContent = ">",
  scrollSnapType = "x mandatory",
  scrollSnapAlign = "start",
  scrollPadding = "30px",
  scrollBy,
  gap = "20px",
  allowScroll = true,
}) {
  const carouselRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const scrollToPrev = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = Number(scrollBy)
        ? Number(scrollBy)
        : carousel.children[1]?.offsetWidth || 50;
      const left = -scrollAmount;
      carousel.scrollBy({
        left,
        behavior: "smooth",
      });
    }
  };

  const scrollToNext = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = Number(scrollBy)
        ? Number(scrollBy)
        : carousel.children[1]?.offsetWidth || 50;
      const left = scrollAmount;
      carousel.scrollBy({
        left,
        behavior: "smooth",
      });
    }
  };

  const updateButtonsVisibility = () => {
    const carousel = carouselRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!carousel || !prevBtn || !nextBtn) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const atStart = scrollLeft < 10;
    const atEnd =
      scrollLeft + clientWidth >= scrollWidth - parseInt(scrollPadding, 10);
    prevBtn.classList.toggle("hidden", atStart);
    nextBtn.classList.toggle("hidden", atEnd);
  };

  useEffect(() => {
    for (const child of carouselRef.current?.children || []) {
      child.style.scrollSnapAlign = scrollSnapAlign;
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const resizeObserver = new ResizeObserver(() => {
        updateButtonsVisibility();
      });
      resizeObserver.observe(carousel);
      const handleScroll = () => updateButtonsVisibility();
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="carousel__container" style={style}>
      <button
        className="carousel__btn carousel__btn__prev"
        style={btnStyle}
        ref={prevBtnRef}
        onClick={scrollToPrev}
      >
        {prevBtnContent}
      </button>
      <button
        className="carousel__btn carousel__btn__next"
        style={btnStyle}
        ref={nextBtnRef}
        onClick={scrollToNext}
      >
        {nextBtnContent}
      </button>
      <div
        className="carousel"
        style={{
          scrollSnapType,
          gap,
          scrollPadding,
          pointerEvents: allowScroll ? "all" : "none",
        }}
        ref={carouselRef}
      >
        {children?.length > 1 && <div></div>}
        {children}
      </div>
    </div>
  );
}
