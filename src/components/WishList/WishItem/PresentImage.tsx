// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css/sea-green";
import "../style.css";

export default function PresentImage() {

    // const handlePagination = (list) => {
    //     if (!list) return;
    //     list.items.forEach(function (item) {
    //         item.button.textContent = String(item.page + 1);
    //         item.button.classList.add('splide__pagination--present');
    //       });
    // }

  return (
    <>
      <Splide
        hasTrack={false}
        aria-label="My Favorite Images"
        options={{
          direction: "ttb",
          height: "10rem",
          arrows: false,
          lazyLoad: true,
        }}
       
        // onPaginationMounted={(splide, pagination) => {
        //     handlePagination(pagination);
        // }}
      >
        <SplideTrack>
          <SplideSlide>
            <Image
              src="/present.jpg"
              width={180}
              height={180}
              alt="Picture of the author"
              //   className="ml-auto"
            />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/present.jpg"
              width={180}
              height={180}
              alt="Picture of the author"
              //   className="ml-auto"
            />
          </SplideSlide>
        </SplideTrack>
      </Splide>
    </>
  );
}
