import GrokSubscriptionModal from "./components/_clones/GrokSubscriptionModal/GrokSubscriptionModal";
import Carousel from "./components/Carousel/Carousel";
import Flip from "./components/Flip/Flip";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader1 from "./components/Loaders/Loader1/Loader1";
import ModalTemplate from "./components/ModalTemplate/ModalTemplate";
import Skeleton from "./components/Loaders/Skeleton/Skeleton";
import Prev from "./assets/icons/Prev";
import Next from "./assets/icons/Next";
import Carousel2 from "./components/Carousel/Carousel2/Carousel2";

function App() {
  return (
    <>
      {/* <Flip
        style={{
          width: "200px",
          height: "300px",
          margin: "50px auto",
          textAlign: "center",
          cursor: "pointer",
        }}
        perspective="1000px"
        perspectiveOrigin="bottom"
        transition="all 2s ease"
        transformStyle="preserve-3d"
        front={
          <div>
            hello world
          </div>
        }
        back={
          <div>
            don't look at the back
          </div>
        }
      /> */}
      {/* <ImageModal 
        src={"https://placehold.co/600x400"}
        alt={"Placeholder image"}
        style={{
          width: "500px",
          height: "500px",
        }}
        imgStyle={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      /> */}
      {/* <Loader1 size="30px" thickness="6px" primaryColor="#d7d7d7" secondaryColor="gray" speed="0.3s"/> */}
      {/* <Carousel
        style={{
          margin: "10px 0px"
        }}
        prevBtnContent={<Prev size={20} />}
        nextBtnContent={<Next size={20} />}
        allowScroll={false}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <img src={`https://picsum.photos/800/400?random=${index}`} alt="random image" loading="lazy" />
        ))}
      </Carousel> */}
      <Carousel2
        style={{
          margin: "20px",
          maxHeight: "400px"
        }}
        slidingSpeed="0.5s"
        autoSlide={true}
        maxDotsToShow={10}
      >
        {Array.from({ length: 40 }).map((_, index) => (
          <img
            src={`https://picsum.photos/800/400?random=${index}`}
            alt="random image"
            loading="lazy"
          />
        ))}
      </Carousel2>
      {/* <GrokSubscriptionModal /> */}
      {/* <Skeleton
        width="70%"
        height="100px"
        backgroundColor="lightgray"
        shimmerColor="#f0f0f0"
        borderRadius="10px"
        speed={"1.6s"}
        style={{ margin: "auto", marginBlock: "20px" }}
      /> */}
    </>
  );
}

export default App;
