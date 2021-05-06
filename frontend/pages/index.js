import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import Course from "../components/Course";
import Layout from "../components/layout";
import styles from "../styles/index.module.scss";
export default function Home() {
  const settings = {
    preloadImages: false,
    slidesPerView: 4,
    spaceBetween: 15,
    loop: true,
    grabCursor: true,
    mousewheel: false,
    centeredSlides: false,
    // pagination: {
    //    el: '.tc-pagination2',
    //    clickable: true,
    //   dynamicBullets: true,
    // },
    navigation: {
      nextEl: ".listing-carousel-button-next2",
      prevEl: ".listing-carousel-button-prev2",
    },
    breakpoints: {
      1650: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1270: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      850: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  };

  return (
    <>
      <div
        id="home"
        style={{ backgroundImage: "url(/images/header-bg.jpg)" }}
        className={`${styles.header_hero} ${styles.bg_cover}`}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className={styles.header_content}>
                <div class="container mx-auto py-8">
                  <input
                    class="w-full h-16 px-3 rounded focus:outline-none focus:shadow-outline text-xl shadow-lg"
                    type="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.header_shape}>
          <img src="/images/header-shape.svg" alt="shape" />
        </div>
      </div>
      <Swiper {...settings}>
        <SwiperSlide>
          <Course />
        </SwiperSlide>

        <SwiperSlide>
          <Course />
        </SwiperSlide>
        <SwiperSlide>
          <Course />
        </SwiperSlide>
        <SwiperSlide>
          <Course />
        </SwiperSlide>
        <SwiperSlide>
          <Course />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
