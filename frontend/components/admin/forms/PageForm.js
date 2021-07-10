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
import ImageUpload from "../../ImageUpload";
import ScriptFileUpload from "../../ScriptFileUpload";
import { useDispatch, useSelector } from "react-redux";
import { createPage, updatePage } from "../../../actions/pageActions";
import Loader from "../../Loader";
import Message from "../../Message";
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  url: yup.string().url().required(),
});
const PageForm = ({ page }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    if (updateSuccess || createSuccess) router.push("/admin/pages");
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: page?.name,
      description: page?.description,
      url: page?.url,
    },
  });

  const [defaultImage, setDefaultImage] = useState([]);

  useEffect(() => {
    if (page?.image) setDefaultImage([page.image]);
  }, [page]);

  const onImageChange = (event) => {
    if (defaultImage.length > 0) {
      deleteDefaultImage();
    }
    setImage([...event.target.files]);
  };
  const deletePic = (index) => {
    const arr = [...image];
    URL.revokeObjectURL(arr.splice(index, 1).preview);
    setImage(arr);
  };
  const deleteDefaultImage = () => {
    setDefaultImage([]);
  };

  useEffect(() => {
    setFile(
      Object.values(image).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [image]);

  const pageUpdate = useSelector((state) => state.pageUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = pageUpdate;

  const pageCreate = useSelector((state) => state.pageCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = pageCreate;

  const onSubmit = (data) => {
    if (window.confirm("Bạn có chắc chắn muốn lưu ?")) {
      setShowModal(true);

      if (page && page.name)
        dispatch(updatePage(page._id, data, image, defaultImage));
      else dispatch(createPage(data, image));
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Tên trang</Form.Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập tên trang khóa học"
              />
            )}
          />
          {errors.name?.type === "required" && "Tên không được bỏ trống"}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                rows="9"
                placeholder="Nhập mô tả của trang"
              />
            )}
          />
          {errors.description?.type === "required" &&
            "Mô tả không được bỏ trống"}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Đường dẫn</Form.Label>
          <Controller
            name="url"
            control={control}
            defaultValue={page?.url}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập đường dẫn đến trang"
              />
            )}
          />
          {errors.url?.type === "required" && "Đường dẫn không được bỏ trống"}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hình ảnh</Form.Label>
          <ImageUpload
            defaultImages={defaultImage}
            images={file}
            onChange={onImageChange}
            onDel={deletePic}
            onDelDefault={deleteDefaultImage}
          />
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

export default PageForm;
