import { useEffect, useRef } from "react";
import "./Carousel2.css";

export default ({
  children,
  style,
  showBtns = true,
  showDots = true,
  autoSlide,
  autoSlideDelay = 4000,
  slidingSpeed = "0.4s",
  maxDotsToShow = 7,
}) => {
  const childrenLength = children ? (Array.isArray(children) ? children.length : 1) : 0;
  const carouselRef = useRef(null);
  const dotsContainerRef = useRef(null);
  const currentIndexRef = useRef(1);
  const autoSlideIntervalIdRef = useRef(null);

  const resetCarousel = () => {
    const carousel = carouselRef.current;
    const currentIndex = currentIndexRef.current;
    if (carousel) {
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => {
        carousel.style.transition = `transform ${slidingSpeed} ease`;
      }, 0);
    } 
  };

  const updateCarousel = () => {
    const carousel = carouselRef.current;
    const currentIndex = currentIndexRef.current;
    if (carousel) {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      showDots && updateDots();
    } 
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      currentIndexRef.current -= 1;
      updateCarousel();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      currentIndexRef.current += 1;
      updateCarousel();

    }
  };

  const startAutoSlide = () => {
    autoSlideIntervalIdRef.current = setInterval(() => {
      currentIndexRef.current += 1;
      updateCarousel();
    }, autoSlideDelay); 
  }; 

  const updateDots = () => {
    const dotsContainer = dotsContainerRef.current;
    let dots = dotsContainer.children;
    dots = Array.from(dots);
    const currentIndex = currentIndexRef.current;
    let dotIndex = currentIndex - 1;
    if (dotIndex < 0) dotIndex = dots.length - 1;
    else if (dotIndex >= dots.length) dotIndex = 0;

    dots?.forEach((dot, index) => {
      dot.classList.toggle("active", index === dotIndex);
    });

// Scroll to align the active dot's right edge with the container's right edge
const activeDot = dots[dotIndex];
if (activeDot && dotsContainer) {
  const dotWidth = activeDot.offsetWidth;
  const containerWidth = dotsContainer.offsetWidth;
  const dotOffsetLeft = activeDot.offsetLeft;
  let scrollPosition = dotOffsetLeft + dotWidth - containerWidth;

  // Ensure the scroll position doesn't go negative (keep the dot fully in view)
  scrollPosition = Math.max(0, scrollPosition);

  dotsContainer.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
}

  };

  useEffect(() => {
    const carousel = carouselRef.current;
    const currentIndex = currentIndexRef.current;

    if (carousel) {
      // 3 1 2 3 1
      if (carousel.childElementCount > 1) {
        const firstClone = carousel.children[0].cloneNode(true);
        const lastClone = carousel.children[carousel.childElementCount - 1].cloneNode(true);
        carousel.insertBefore(lastClone, carousel.children[0]);
        carousel.appendChild(firstClone);
      }

      // move to 1
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      // listen for the event that if the user slides to lastClone(3) or firstClone(1)    
      carousel.addEventListener("transitionend", () => {
        const carousel = carouselRef.current;
        const currentIndex = currentIndexRef.current;

        // if you are at lastClone(3)
        if (currentIndex === 0) {
          currentIndexRef.current = carousel.childElementCount - 2;
          resetCarousel();
        }
        // if you are at firstClone(1)
        else if (currentIndex === carousel.childElementCount - 1) {
          currentIndexRef.current = 1;
          resetCarousel();
        }
      });

      // auto slide
      if (autoSlide) {
        startAutoSlide();
        carousel.parentElement.addEventListener("mouseenter", () => clearInterval(autoSlideIntervalIdRef.current));
        carousel.parentElement.addEventListener("mouseleave", () => startAutoSlide());
      }

      // update dots
      updateDots();

      // setting the width of dots container
      const dotsContainer = dotsContainerRef.current;
      if (dotsContainer) {
        if (dotsContainer.childElementCount > maxDotsToShow) {
          const notActiveDotWidth = dotsContainer.querySelector(".carousel-2__dot:not(.active)").offsetWidth;
          const activeDotWidth = dotsContainer.querySelector(".carousel-2__dot.active").offsetWidth;
          const gap = parseInt(getComputedStyle(dotsContainer).gap) || 0;
          const newWidth = (notActiveDotWidth * (maxDotsToShow - 1)) + (gap * (maxDotsToShow - 1)) + (activeDotWidth);
          dotsContainer.style.width = `${newWidth}px`;    
        }
      }
    }
  }, []);

  return (
    <div className="carousel-2__container" style={style}>
      <div className="carousel-2" style={{ transition: `transform ${slidingSpeed} ease` }} ref={carouselRef}>{children}</div>
      {showBtns && children?.length > 1 && (
        <>
          <button className="carousel-2__btn carousel-2__btn__prev" onClick={handlePrevClick}>❮</button>
          <button className="carousel-2__btn carousel-2__btn__next" onClick={handleNextClick}>❯</button>
        </>
      )}
      {showDots && children?.length > 1 && (
        <div className="carousel-2__dots__container" ref={dotsContainerRef}>
          {Array.from({ length: children?.length || 0 }).map((_, index) => (
            <div 
              className="carousel-2__dot"
              onClick={() => {
                currentIndexRef.current = index + 1;
                updateCarousel();
              }}
            ></div>    
          ))}
        </div>
      )}
    </div>
  );
}