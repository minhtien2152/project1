import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import router from "next/router";
import { useEffect, useState } from "react";
import { listCourseDetails, listCourses } from "../../actions/courseActions";
import { initializeStore, wrapper } from "../../store";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Modal,
} from "@themesberg/react-bootstrap";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import Layout from "../../components/layout";
import { listPageDetails } from "../../actions/pageActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Link from "next/link";
import { listInstructorDetail } from "../../actions/instructorActions";
import CommentModal from "../../components/CommentModal";
import { listComments } from "../../actions/commentActions";
const CoursePage = (props) => {
  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading: courseLoading, error: courseError, course } = courseDetails;

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const commentList = useSelector((state) => state.commentList);
  const { comments } = commentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pageDetails = useSelector((state) => state.pageDetails);
  const { loading: pageLoading, error: pageError, page } = pageDetails;

  const instructorDetail = useSelector((state) => state.instructorDetail);
  const {
    loading: instructorLoading,
    error: instructorError,
    instructor,
  } = instructorDetail;

  useEffect(() => {
    if (course?.page) dispatch(listPageDetails(course.page));
    if (course?.instructor) dispatch(listInstructorDetail(course.instructor));
    if (course?._id) dispatch(listComments({ course: course._id }));
  }, [course]);

  return (
    <Layout>
      <Head>
        <title>{course?.title}</title>
      </Head>
      <div className="container">
        {!courseLoading && course && (
          <>
            <Row>
              <Col lg={8} md={8} sm={12} xs={12} className={styles.des_col}>
                <Card border="light" className="shadow-sm mb-4">
                  <Card.Body className="pb-4">
                    {course.media?.type === "video_link" ? (
                      <div class={styles.videoWrapper}>
                        <iframe
                          src={course.media?.value}
                          width="560"
                          height="315"
                          scrolling="no"
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      </div>
                    ) : (
                      <img src={course.media?.value} />
                    )}
                  </Card.Body>
                </Card>

                <Card border="light" className="shadow-sm mb-4">
                  <Card.Header as="h5">Bạn sẽ học được gì</Card.Header>
                  <Card.Body className={styles.knowledge}>
                    {course?.knowledge}
                  </Card.Body>
                </Card>
                <Card border="light" className="shadow-sm mb-4">
                  <Card.Header as="h5">Mô tả khóa học</Card.Header>
                  <Card.Body className={styles.description}>
                    {course?.description}
                  </Card.Body>
                </Card>
                <Card border="light" className="shadow-sm mb-4">
                  <Card.Header
                    as="h5"
                    className="flex justify-between items-center"
                  >
                    Nhận xét
                    {userInfo?.user?.name && (
                      <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                      >
                        Thêm nhận xét
                      </Button>
                    )}
                  </Card.Header>
                  <Card.Body>
                    {comments?.map((comment) => (
                      <div className={styles.comment}>
                        <div className={styles.ava}>
                          <img src={comment?.user?.avatar} />
                        </div>
                        <div className={styles.content_block}>
                          <div className={styles.name}>
                            {comment?.user?.name}
                          </div>
                          <div className={styles.rating}>
                            {[...Array(comment?.rating)].map((x) => (
                              <i class="fas fa-star"></i>
                            ))}
                            {[...Array(5 - comment?.rating)].map((x) => (
                              <i class="far fa-star"></i>
                            ))}
                          </div>
                          <div className={styles.content}>
                            {comment?.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card border="light" className="shadow-sm mb-4">
                  <Card.Header as="h5">Thông tin chung</Card.Header>
                  <ListGroup>
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
                        <Col>
                          {new Intl.NumberFormat("vi-VI", {
                            style: "currency",
                            currency: "VND",
                          }).format(course.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button className="btn-block" type="button">
                        <a
                          target="_blank"
                          href={course.url}
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Đi đến trang khóa học
                        </a>
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button variant="danger" className="btn-block">
                        Thêm vào danh sách yêu thích
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>

                <Card border="light" className="shadow-sm mb-4">
                  <Card.Header as="h5">
                    Trang cung cấp :
                    <Link href={`/page/${page?._id}`}>
                      <a>{page?.name}</a>
                    </Link>
                  </Card.Header>
                  <Card.Body className={styles.knowledge}>
                    {pageLoading ? (
                      <Loader />
                    ) : pageError ? (
                      <Message variant="danger">{pageError}</Message>
                    ) : (
                      page?.description
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Viết nhận xét</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommentModal course={course?._id} user={userInfo?.user?._id} />
        </Modal.Body>
      </Modal>
    </Layout>
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
