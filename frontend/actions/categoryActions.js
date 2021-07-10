import axios from "axios";
import { BACKEND_API } from "../config";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/categoryConstants";
export const listCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/categories`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCategoryDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/categories/${id}`);

    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `${BACKEND_API}/api/categories/`,
      category
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(
      `${BACKEND_API}/api/categories/${id}`,
      category
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_API}/api/categories/${id}`);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
