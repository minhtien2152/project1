import { Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout";
import styles from "../../../styles/adminCourses.module.scss";

import { useRouter } from "next/router";
import ListingTable from "../../../components/admin/ListingTable";
import {
  deleteInstructor,
  listInstructor,
} from "../../../actions/instructorActions";
import ReactPaginate from "react-paginate";

const headers = ["#", "Tên", "Đường dẫn", "Trang", ""];
const attributes = ["name", "url", "page.name"];

const instructors = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const instructorList = useSelector((state) => state.instructorList);
  const { instructors, total } = instructorList;

  const instructorDelete = useSelector((state) => state.instructorDelete);
  const { loading, error, success } = instructorDelete;

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
      dispatch(deleteInstructor(id));
    }
  };
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const limit = 10;
  useEffect(() => {
    dispatch(listInstructor({ limit, page: 1, populate: "page" }));
  }, [dispatch, success]);
  useEffect(() => {
    setPageCount(Math.ceil(total / limit));
  }, [total]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      listInstructor({ keyword: query, limit, page: 1, populate: "page" })
    );
  };
  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(
      listInstructor({
        keyword: query,
        limit,
        page: selected,
        populate: "page",
      })
    );
  };

  return (
    <Layout admin>
      <div>Danh sách các giảng viên</div>
      <div>
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body className="pb-0">
            <div className="flex justify-between">
              <Form className="w-72" onSubmit={handleSearch}>
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
              data={instructors}
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

export default instructors;
