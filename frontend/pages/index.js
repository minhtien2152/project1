import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/index.module.scss";
export default function Home() {
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
    </>
  );
}
