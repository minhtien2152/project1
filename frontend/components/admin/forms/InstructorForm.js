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
import {
  createPage,
  listPages,
  updatePage,
} from "../../../actions/pageActions";
import Loader from "../../Loader";
import Message from "../../Message";
import {
  createIntructor,
  updateInstructor,
} from "../../../actions/instructorActions";
const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  url: yup.string().url().required(),
  page: yup.string().required(),
});
const InstructorForm = ({ instructor }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    if (updateSuccess || createSuccess) router.push("/admin/instructors");
  };

  const pageList = useSelector((state) => state.pageList);
  const { pages } = pageList;

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...instructor,
    },
  });
  const watchAvatar = watch("avatar.type");
  const [defaultImage, setDefaultImage] = useState([]);

  useEffect(() => {
    if (instructor?.avatar?.type === "cdn")
      setDefaultImage([instructor.avatar.value]);
  }, [instructor]);

  useEffect(() => {
    dispatch(listPages());
  }, [dispatch]);

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

  const instructorUpdate = useSelector((state) => state.instructorUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = instructorUpdate;

  const instructorCreate = useSelector((state) => state.instructorCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = instructorCreate;

  const onSubmit = (data) => {
    if (window.confirm("Bạn có chắc chắn muốn lưu ?")) {
      setShowModal(true);

      if (instructor && instructor.name)
        dispatch(updateInstructor(instructor._id, data, image));
      else dispatch(createIntructor(data, image));
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Tên giảng viên</Form.Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập tên giảng viên"
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
                placeholder="Nhập mô tả"
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
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập đường dẫn"
              />
            )}
          />
          {errors.url?.type === "required" && "Đường dẫn không được bỏ trống"}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trang khóa học</Form.Label>

          <Controller
            name="page"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control as="select" {...field}>
                <option value="" disabled selected>
                  Chọn trang
                </option>
                {pages?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hình ảnh</Form.Label>
          <Controller
            name="avatar.type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control className="mb-3" as="select" {...field}>
                <option value="cdn">Image CDN</option>
                <option value="link">Image Link</option>
              </Form.Control>
            )}
          />
          {watchAvatar === "link" ? (
            <>
              <Form.Label>Link</Form.Label>
              <Controller
                name="avatar.value"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Nhập link "
                  />
                )}
              />
              {errors.thumbnail?.value?.message}
            </>
          ) : (
            <ImageUpload
              defaultImages={defaultImage}
              images={file}
              onChange={onImageChange}
              onDel={deletePic}
              onDelDefault={deleteDefaultImage}
            />
          )}
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

export default InstructorForm;
