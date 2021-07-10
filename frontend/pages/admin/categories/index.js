import { Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout";
import styles from "../../../styles/adminCourses.module.scss";

import { useRouter } from "next/router";
import ListingTable from "../../../components/admin/ListingTable";
import { deletePage, listPages } from "../../../actions/pageActions";
import {
  deleteCategory,
  listCategories,
} from "../../../actions/categoryActions";

const headers = ["#", "Tên", "Đường dẫn", ""];
const attributes = ["name", "path"];
const categories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading, success } = categoryDelete;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, success]);

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
      dispatch(deleteCategory(id));
    }
  };
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (categories?.length > 0) setFiltered(categories);
  }, [categories]);

  useEffect(() => {
    const regex = new RegExp(query, "gi");
    setFiltered(
      categories?.filter((category) => {
        return category?.name?.match(regex);
      })
    );
  }, [query]);
  return (
    <Layout admin>
      <div>Danh sách các danh mục</div>
      <div>
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body className="pb-0">
            <div className="flex justify-between">
              <Form className="w-72">
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
              data={categories}
              open={handleOpen}
              update={handleUpdate}
              del={handleDelete}
            ></ListingTable>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default categories;
