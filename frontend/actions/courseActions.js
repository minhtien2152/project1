import {
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
} from "../constants/courseConstants";
import axios from "axios";
import { BACKEND_API } from "../config";
export const listCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/courses`);

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data.data,
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
