import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../actions/userActions";
import { handleMedia } from "../../lib/utils";
import styles from "../../styles/likelist.module.scss";
import Head from "next/head";

const LikeList = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userCourses = useSelector((state) => state.userCourses);
  const { courses } = userCourses;

  useEffect(() => {
    if (profile) dispatch(getUserCourses(profile._id));
  }, [profile]);

  const handleDeleteCourse = (id) => {};
  return (
    <div className={styles.container}>
      <Head>
        <link type="text/css" rel="stylesheet" href="/css/plugin.css" />
      </Head>
      <div className={styles.title}>Danh sách yêu thích của bạn</div>
      <div>
        {courses?.length > 0 ? (
          courses.map((course) => (
            <div className={styles.course}>
              <img
                className={styles.img}
                src={
                  course?.thumbnail?.type === "cdn"
                    ? `/cdn/${course?.thumbnail?.value}`
                    : course?.thumbnail?.value
                }
              />
              <div className={styles.text}>
                <h4>{course.title}</h4>
                <p>
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.price)}
                </p>
              </div>

              <div className={styles.del_button}>
                <a
                  className="tolt"
                  data-microtip-position="left"
                  data-tooltip="Xoá"
                >
                  <i className="fas fa-trash" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center flex justify-center items-center"
            style={{ minHeight: "100px" }}
          >
            <i className="fas fa-box-open"></i> Bạn chưa có khóa học yêu thích
            nào
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeList;
