import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { listCourses } from "../../actions/courseActions";
import { useEffect, useState } from "react";
import { Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import styles from "../../styles/courseQuery.module.scss";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const index = () => {
  const dispatch = useDispatch();
  const limit = 10;
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();
  const { s, cat } = router.query;

  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses, total } = courseList;

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({ query: { s: query } });
  };
  useEffect(() => {
    dispatch(listCourses({ keyword: s, category: cat, limit, page: 1 }));
  }, [s, cat]);

  useEffect(() => {
    setPageCount(Math.ceil(total / limit));
  }, [total]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(listCourses({ keyword: s, category: cat, limit, page: selected }));
  };
  return (
    <Layout>
      <div className="container">
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body>
            <Form onSubmit={handleSearch}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fas fa-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
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
