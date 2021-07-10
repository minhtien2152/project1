import { Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, listCourses } from "../../../actions/courseActions";

import Layout from "../../../components/layout";
import styles from "../../../styles/adminCourses.module.scss";

import { useRouter } from "next/router";
import ListingTable from "../../../components/admin/ListingTable";
import ReactPaginate from "react-paginate";

const headers = ["#", "Tên", "Giá", "Media", "Thời lượng", ""];
const attributes = ["title", "price", "media.type", "duration"];
const courses = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const courseList = useSelector((state) => state.courseList);
  const { courses, total } = courseList;

  const courseDelete = useSelector((state) => state.courseDelete);
  const { loading, success } = courseDelete;
  const limit = 10;
  useEffect(() => {
    dispatch(listCourses({ limit, page: 1 }));
  }, [dispatch, success]);

  useEffect(() => {
    setPageCount(Math.ceil(total / limit));
  }, [total]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(listCourses({ limit, page: selected }));
  };
  const handleCreate = () => {
    router.push(router.pathname + "/new");
  };
  const handleOpen = (id) => {
    router.push(router.pathname + "/" + id);
  };
  const handleUpdate = (id) => {
    router.push(router.pathname + "/" + id + "/edit");
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      dispatch(deleteCourse(id));
    }
  };
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(listCourses({ keyword: query, limit, page: 1 }));
  };

  return (
    <Layout admin>
      <div>Danh sách khóa học</div>

      <div>
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body className="pb-0">
            <div className="flex justify-between">
              <Form className="w-72" onSubmit={(e) => handleSearch(e)}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i class="fas fa-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
              <button
                type="button"
                className="btn btn-danger mb-3"
                onClick={handleCreate}
              >
                Tạo mới
              </button>
            </div>

            <ListingTable
              headers={headers}
              attributes={attributes}
              data={courses}
              open={handleOpen}
              update={handleUpdate}
              del={handleDelete}
            ></ListingTable>
          </Card.Body>
        </Card>
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

export default courses;
