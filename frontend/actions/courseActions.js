import {
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
} from "../constants/courseConstants";
import axios from "axios";
import { BACKEND_API } from "../config";
import { uploadImage } from "./imageActions";
export const listCourses = (params) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/courses`, {
      params: params,
    });

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/courses/${id}`);

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_API}/api/courses/${id}`);

    dispatch({
      type: COURSE_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCourse =
  (course, media, thumb) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_CREATE_REQUEST,
      });

      let cos = { ...course };
      if (media?.length > 0) {
        await dispatch(uploadImage(media));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        cos = { ...cos, media: { type: "img_cdn", value: filename } };
      }

      if (thumb?.length > 0) {
        await dispatch(uploadImage(thumb));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        cos = { ...cos, thumbnail: { type: "cdn", value: filename } };
      }

      const { data } = await axios.post(`${BACKEND_API}/api/courses/`, cos);

      dispatch({
        type: COURSE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateCourse =
  (id, course, media, thumb) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_UPDATE_REQUEST,
      });
      let cos = { ...course };
      if (media?.length > 0) {
        await dispatch(uploadImage(media));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        cos = { ...cos, media: { type: "img_cdn", value: filename } };
      }

      if (thumb?.length > 0) {
        await dispatch(uploadImage(thumb));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        cos = { ...cos, thumbnail: { type: "cdn", value: filename } };
      }
      console.log(id);
      const { data } = await axios.patch(
        `${BACKEND_API}/api/courses/${id}`,
        cos
      );

      dispatch({
        type: COURSE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COURSE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
