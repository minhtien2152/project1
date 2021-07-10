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
import { listCategories } from "../../../actions/categoryActions";
import { listInstructor } from "../../../actions/instructorActions";
import { createCourse, updateCourse } from "../../../actions/courseActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  url: yup.string().url().required(),
  price: yup.number().required(),
  category: yup.string().required(),
  page: yup.string().required(),
  instructor: yup.string().required(),
  knowledge: yup.string().required(),
  media: yup.object().shape({
    type: yup.string(),
    value: yup.string().when("type", {
      is: (val) => val == "img_link" || val == "video_link",
      then: yup
        .string()
        .url("Không đúng định dạng")
        .required("Không được bỏ trống"),
    }),
  }),
});
const PageForm = ({ course }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [media, setMedia] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);

  const [thumb, setThumb] = useState([]);
  const [thumbPreview, setThumbPreview] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    if (updateSuccess || createSuccess) router.push("/admin/courses");
  };

  const pageList = useSelector((state) => state.pageList);
  const { pages } = pageList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const instructorList = useSelector((state) => state.instructorList);
  const { instructors } = instructorList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listPages());
    dispatch(listInstructor());
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...course,
    },
  });

  const watchMedia = watch("media.type");
  const watchThumbnail = watch("thumbnail.type");

  const [defaultMedia, setDefaultMedia] = useState([]);
  const [defaultThumb, setDefaultThumb] = useState([]);

  useEffect(() => {
    if (course?.thumbnail?.type === "cdn")
      setDefaultThumb([course.thumbnail.value]);
    if (course?.media?.type === "img_cdn")
      setDefaultMedia([course.media.value]);
  }, [course]);

  const onMediaChange = (event) => {
    if (defaultMedia.length > 0) {
      deleteDefaultMedia();
    }
    setMedia([...event.target.files]);
  };
  const onThumbChange = (event) => {
    if (defaultThumb.length > 0) {
      deleteDefaultThumb();
    }
    setThumb([...event.target.files]);
  };
  const deleteMedia = (index) => {
    const arr = [...media];
    URL.revokeObjectURL(arr.splice(index, 1).preview);
    setMedia(arr);
  };
  const deleteThumb = (index) => {
    const arr = [...thumb];
    URL.revokeObjectURL(arr.splice(index, 1).preview);
    setThumb(arr);
  };
  const deleteDefaultMedia = () => {
    setDefaultMedia([]);
  };
  const deleteDefaultThumb = () => {
    setDefaultThumb([]);
  };

  useEffect(() => {
    setMediaPreview(
      Object.values(media).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [media]);

  useEffect(() => {
    setThumbPreview(
      Object.values(thumb).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [thumb]);

  const courseUpdate = useSelector((state) => state.courseUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = courseUpdate;

  const courseCreate = useSelector((state) => state.courseCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = courseCreate;

  const onSubmit = (data) => {
    console.log(errors);
    if (window.confirm("Bạn có chắc chắn muốn lưu ?")) {
      setShowModal(true);

      if (course && course._id)
        dispatch(updateCourse(course._id, data, media, thumb));
      else dispatch(createCourse(data, media, thumb));
    }
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Tên khóa học</Form.Label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập tên khóa học"
              />
            )}
          />
          {errors.title?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phần Mô tả</Form.Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                rows="9"
                placeholder="Nhập mô tả của khóa học"
              />
            )}
          />
          {errors.description?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phần Tóm tắt nội dung</Form.Label>
          <Controller
            name="knowledge"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                rows="9"
                placeholder="Nhập tóm tắt nội dung của khóa học"
              />
            )}
          />
          {errors.knowledge?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Giá</Form.Label>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control
                {...field}
                type="text"
                placeholder="Nhập giá khóa học"
              />
            )}
          />
          {errors.price?.message}
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
          {errors.url?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Danh mục</Form.Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control as="select" {...field}>
                <option value="" disabled selected>
                  Chọn danh mục
                </option>
                {categories?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
            )}
          />
          {errors.category?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Trang cung cấp</Form.Label>
          <Controller
            name="page"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control as="select" {...field}>
                <option value="" disabled selected>
                  Chọn trang cung cấp
                </option>
                {pages?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
            )}
          />
          {errors.page?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Giảng viên</Form.Label>
          <Controller
            name="instructor"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control as="select" {...field}>
                <option value="" disabled selected>
                  Chọn giảng viên
                </option>
                {instructors?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
            )}
          />
          {errors.instructor?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Media</Form.Label>
          <Controller
            name="media.type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control className="mb-3" as="select" {...field}>
                <option value="img_cdn">Image CDN</option>
                <option value="img_link">Image Link</option>
                <option value="video_link">Video Link</option>
              </Form.Control>
            )}
          />
          {watchMedia === "img_link" || watchMedia === "video_link" ? (
            <>
              <Form.Label>Link</Form.Label>
              <Controller
                name="media.value"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Nhập link media"
                  />
                )}
              />
              {errors.media?.value?.message}
            </>
          ) : (
            <ImageUpload
              defaultImages={defaultMedia}
              images={mediaPreview}
              onChange={onMediaChange}
              onDel={deleteMedia}
              onDelDefault={deleteDefaultMedia}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hình ảnh thumbnail</Form.Label>

          <Controller
            name="thumbnail.type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control className="mb-3" as="select" {...field}>
                <option value="cdn">Image CDN</option>
                <option value="link">Image Link</option>
              </Form.Control>
            )}
          />
          {watchThumbnail === "link" ? (
            <>
              <Form.Label>Link</Form.Label>
              <Controller
                name="thumbnail.value"
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
              defaultImages={defaultThumb}
              images={thumbPreview}
              onChange={onThumbChange}
              onDel={deleteThumb}
              onDelDefault={deleteDefaultThumb}
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

export default PageForm;
