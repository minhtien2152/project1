import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import router from "next/router";
import { useEffect } from "react";
import { listCourseDetails, listCourses } from "../../actions/courseActions";
import { initializeStore, wrapper } from "../../store";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "@themesberg/react-bootstrap";
import styles from "../../styles/coursePage.module.scss";
const CoursePage = (props) => {
  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, error, course } = courseDetails;

  return (
    <div className="container">
      {!loading && course && (
        <Row>
          <Col lg={7} md={6} sm={12} xs={12} className={styles.des_col}>
            <Row className={styles.section}>
              <iframe
                src={course.media.url}
                width="100%"
                height="415"
                scrolling="no"
                frameborder="0"
                allowfullscreen=""
              ></iframe>
            </Row>

            <Row className={`${styles.section}`}>
              <h3 className={styles.heading}>Mô tả khóa học</h3>
              <p className={styles.description}>{course.description}</p>
            </Row>
          </Col>
          {/* <Col md={7}>
            
          </Col> */}
          <Col md={4}>
            <Card className={`${styles.card} ${styles.sticky}`}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Thời lượng:</Col>
                    <Col>
                      <strong>{course.duration}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Đánh giá:</Col>
                    <Col>{course.rating}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Ngôn ngữ giảng dạy:</Col>
                    <Col>Tiếng Việt</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Giá:</Col>
                    <Col>{course.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="btn-block" type="button">
                    <a
                      target="_blank"
                      href={course.url}
                      rel="noopener noreferrer"
                    >
                      Đi đến trang khóa học
                    </a>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params, store }) => {
    await store.dispatch(listCourseDetails(params.id));
  }
);

// export const getStaticPaths =  wrapper.getStaticPaths() {
//   const reduxStore = initializeStore();
//   const { dispatch } = reduxStore;
//   await dispatch(listCourses());

//   const courses = reduxStore.getState().courseList.courses;

//   const paths = courses.map((course) => ({
//     params: { id: course._id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export default CoursePage;
