import axios from "axios";
import { BACKEND_API } from "../config";
import {
  INSTRUCTOR_CREATE_FAIL,
  INSTRUCTOR_CREATE_REQUEST,
  INSTRUCTOR_CREATE_SUCCESS,
  INSTRUCTOR_DELETE_FAIL,
  INSTRUCTOR_DELETE_REQUEST,
  INSTRUCTOR_DELETE_SUCCESS,
  INSTRUCTOR_DETAIL_FAIL,
  INSTRUCTOR_DETAIL_REQUEST,
  INSTRUCTOR_DETAIL_SUCCESS,
  INSTRUCTOR_LIST_FAIL,
  INSTRUCTOR_LIST_REQUEST,
  INSTRUCTOR_LIST_SUCCESS,
  INSTRUCTOR_UPDATE_FAIL,
  INSTRUCTOR_UPDATE_REQUEST,
  INSTRUCTOR_UPDATE_SUCCESS,
} from "../constants/instructorConstants";
import { uploadImage } from "./imageActions";

export const listInstructor = () => async (dispatch) => {
  try {
    dispatch({
      type: INSTRUCTOR_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/instructors`);

    dispatch({
      type: INSTRUCTOR_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listInstructorDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INSTRUCTOR_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/instructors/${id}`);

    dispatch({
      type: INSTRUCTOR_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createIntructor =
  (instructor, imageToUpload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INSTRUCTOR_CREATE_REQUEST,
      });
      let ins = { ...instructor };
      if (imageToUpload?.length > 0) {
        await dispatch(uploadImage(imageToUpload));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        ins = { ...ins, avatar: { type: "cdn", value: filename } };
      }

      const { data } = await axios.post(`${BACKEND_API}/api/instructors/`, ins);

      dispatch({
        type: INSTRUCTOR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INSTRUCTOR_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateInstructor =
  (id, instructor, imageToUpload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INSTRUCTOR_UPDATE_REQUEST,
      });

      let ins = { ...instructor };
      if (imageToUpload?.length > 0) {
        await dispatch(uploadImage(imageToUpload));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        ins = { ...ins, avatar: { type: "cdn", value: filename } };
      }
      const { data } = await axios.patch(
        `${BACKEND_API}/api/instructors/${id}`,
        ins
      );

      dispatch({
        type: INSTRUCTOR_UPDATE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: INSTRUCTOR_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteInstructor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INSTRUCTOR_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_API}/api/instructors/${id}`);

    dispatch({
      type: INSTRUCTOR_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
