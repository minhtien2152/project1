import { useRouter } from "next/router";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import Message from "../../Message";
import {
  createCategory,
  updateCategory,
} from "../../../actions/categoryActions";
const schema = yup.object().shape({
  name: yup.string().required(),
  path: yup.string().required(),
});
const CategoryForm = ({ category }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    if (updateSuccess || createSuccess) router.push("/admin/categories");
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: category?.name,
      path: category?.path,
    },
  });

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = categoryUpdate;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = categoryCreate;

  const onSubmit = (data) => {
    if (window.confirm("Bạn có chắc chắn muốn lưu ?")) {
      setShowModal(true);

      if (category && category.name)
        dispatch(updateCategory(category._id, data));
      else dispatch(createCategory(data));
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Tên danh mục</Form.Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập tên danh mục"
              />
            )}
          />
          {errors.name?.type === "required" && "Tên không được bỏ trống"}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Đường dẫn</Form.Label>
          <Controller
            name="path"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập đường dẫn đến danh mục"
              />
            )}
          />
          {errors.path?.type === "required" && "Đường dẫn không được bỏ trống"}
        </Form.Group>

        <Form.Group className="mb-3">
          <Button variant="danger" type="submit">
            Lưu
          </Button>

          <button type="button" class="btn btn-primary">
            Hủy
          </button>
          <button type="button" class="btn btn-primary">
            Reset
          </button>
        </Form.Group>
      </form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createLoading || updateLoading ? (
            <Loader />
          ) : createError || updateError ? (
            <>
              <Message variant="danger">Không thành công</Message>
              {/*<Message variant="danger">{createError}</Message>*/}
            </>
          ) : (
            (createSuccess || updateSuccess) && (
              <Message variant="success">Thành công</Message>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryForm;
