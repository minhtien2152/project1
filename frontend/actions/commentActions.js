import axios from "axios";
import { BACKEND_API } from "../config";
import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DETAIL_FAIL,
  COMMENT_DETAIL_REQUEST,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
} from "../constants/commentConstants";
export const listComments = (body) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/comments`, {
      params: body,
    });

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCommentDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/comments/${id}`);

    dispatch({
      type: COMMENT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment = (comment) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_CREATE_REQUEST,
    });

    const { data } = await axios.post(`${BACKEND_API}/api/comments/`, comment);

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(
      `${BACKEND_API}/api/comments/${id}`,
      comment
    );

    dispatch({
      type: COMMENT_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_API}/api/comments/${id}`);

    dispatch({
      type: COMMENT_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
