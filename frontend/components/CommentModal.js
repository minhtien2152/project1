import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "@themesberg/react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../actions/commentActions";
import Loader from "./Loader";
import Message from "./Message";
const schema = yup.object().shape({
  rating: yup.number().required(),
  content: yup.string().required(),
});

const CommentModal = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,

    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...props,
    },
  });

  const onSubmit = (data) => {
    setSubmited(true);
    dispatch(createComment(data));
  };
  const [submited, setSubmited] = useState(false);
  const commentUpdate = useSelector((state) => state.commentUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = commentUpdate;

  const commentCreate = useSelector((state) => state.commentCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = commentCreate;

  return (
    <>
      {!submited ? (
        <form
          className="flex justify-center flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center">
            <Controller
              name="rating"
              className="items-center justify-items-center"
              control={control}
              render={({ field }) => (
                <ReactStars
                  className="items-center justify-items-center"
                  count={5}
                  {...field}
                  size={24}
                  activeColor="#ffd700"
                />
              )}
            />
          </div>

          <Form.Group className="mb-3">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows="5"
                  placeholder="Nhập nhận xét của bạn"
                />
              )}
            />
          </Form.Group>

          <Button variant="danger" type="submit">
            Lưu
          </Button>
        </form>
      ) : createLoading || updateLoading ? (
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
    </>
  );
};

export default CommentModal;
