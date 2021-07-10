import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/instructorPage.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { listInstructorDetail } from "../../actions/instructorActions";
import { Col } from "@themesberg/react-bootstrap";
import { Card } from "@themesberg/react-bootstrap";
import { listCourses } from "../../actions/courseActions";
import ReactPaginate from "react-paginate";
import Link from "next/link";
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const instructorDetail = useSelector((state) => state.instructorDetail);
  const {
    loading: instructorLoading,
    error: instructorError,
    instructor,
  } = instructorDetail;
  const limit = 10;
  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses, total } = courseList;

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(total / limit));
  }, [total]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(listCourses({ instructor: id, limit, page: selected }));
  };
  useEffect(() => {
    if (id) {
      dispatch(listInstructorDetail(id));
      dispatch(listCourses({ instructor: id, limit, page: 1 }));
    }
  }, [id]);
  return (
    <Layout>
      <div
        className={styles.bg}
        style={{ backgroundImage: "url(/images/ins-bg.jpg)" }}
      >
        <div className={styles.block}>
          <div className="container">
            <div className="row">
              <Col lg={6} md={7} sm={8}>
                <div className={styles.instructor}>
                  <div className={styles.avatar}>
                    <img src={instructor?.avatar?.value} />
                  </div>
                  <h1 className={styles.info}>{instructor?.name}</h1>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Card className=" mb-3">
          <Card.Body>
            <h3>Giới thiệu</h3>
            {instructor?.description}
          </Card.Body>
        </Card>
        <h3>Các khóa học</h3>
        {courses?.map((course) => (
          <Card key={course._id} border="light" className="shadow-sm mb-2">
            <Card.Body className={styles.course}>
              <div className={styles.img}>
                <img src={course?.thumbnail.value} />
              </div>
              <div>
                <div className={styles.title}>
                  <Link href={`/course/${course._id}`}>
                    <a> {course.title}</a>
                  </Link>
                </div>
                <div className={styles.rating}>
                  {[...Array(course.rating)].map(() => (
                    <i className="fa fa-star co-or"></i>
                  ))}
                </div>
                <div>
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.price)}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </Layout>
  );
};

export default index;
