import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import Course from "../components/Course";
import styles from "../styles/index.module.scss";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { listCourses } from "../actions/courseActions";
import { useEffect, useState } from "react";
import { wrapper } from "../store";
import Layout from "../components/layout";

const Index = (props) => {
  // useEffect(() => {
  //   props.listCourses();
  // }, [props]);
  const router = useRouter();
  const courseList = useSelector((state) => state.courseList);
  const { courses } = courseList;
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({ pathname: "/course", query: { s: query } });
  };
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
      nextEl: ".nav_next",
      prevEl: ".nav_prev",
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
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
  };

  return (
    <Layout>
      <div
        id="home"
        style={{ backgroundImage: "url(/images/header-bg.jpg)" }}
        className={`${styles.header_hero} ${styles.bg_cover}`}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className={styles.header_content}>
                <div className="container mx-auto py-8">
                  <form onSubmit={handleSearch}>
                    <input
                      className="w-full h-16 px-3 rounded focus:outline-none focus:shadow-outline text-xl shadow-lg"
                      type="search"
                      placeholder="Search..."
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.header_shape}>
          <img src="/images/header-shape.svg" alt="shape" />
        </div>
      </div>

      <div className={styles.section_title}>
        <h2>Các khóa học được đánh giá cao</h2>
        <div className={styles.section_subtitle}>
          Các khóa học được đánh giá cao
        </div>
        <span className={styles.section_separator}></span>
      </div>
      <Swiper {...settings}>
        {courses &&
          courses.slice(5).map((course, index) => (
            <SwiperSlide id={index}>
              <Course course={course} />
            </SwiperSlide>
          ))}
        <div className="nav_next">
          <div
            class={`${styles.listing_carousel_button} ${styles.listing_carousel_button_next2}`}
          >
            <i class="fas fa-caret-right"></i>
          </div>
        </div>
        <div className="nav_prev">
          <div
            class={`${styles.listing_carousel_button} ${styles.listing_carousel_button_prev2}`}
          >
            <i class="fas fa-caret-left"></i>
          </div>
        </div>
      </Swiper>
    </Layout>
  );
};

// export const getStaticProps = async () => {
//   const reduxStore = initializeStore();
//   const { dispatch } = reduxStore;
//   await dispatch(listCourses());

//   return { props: { initialReduxState: reduxStore.getState() } };
// };

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(listCourses());
  }
);

export default Index;
