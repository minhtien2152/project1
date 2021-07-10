import {
  PAGE_CREATE_FAIL,
  PAGE_CREATE_REQUEST,
  PAGE_CREATE_SUCCESS,
  PAGE_DELETE_FAIL,
  PAGE_DELETE_REQUEST,
  PAGE_DELETE_SUCCESS,
  PAGE_DETAILS_FAIL,
  PAGE_DETAILS_REQUEST,
  PAGE_DETAILS_SUCCESS,
  PAGE_LIST_FAIL,
  PAGE_LIST_REQUEST,
  PAGE_LIST_SUCCESS,
  PAGE_UPDATE_FAIL,
  PAGE_UPDATE_REQUEST,
  PAGE_UPDATE_SUCCESS,
} from "../constants/pageConstants";
import axios from "axios";
import { BACKEND_API } from "../config";
import { uploadImage } from "./imageActions";
export const listPages = () => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/pages`);

    dispatch({
      type: PAGE_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPageDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/pages/${id}`);

    dispatch({
      type: PAGE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAGE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`${BACKEND_API}/api/pages/${id}`);

    dispatch({
      type: PAGE_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAGE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPage =
  (page, imagesToUpload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAGE_CREATE_REQUEST,
      });

      await dispatch(uploadImage(imagesToUpload));

      const {
        imageUpload: { images },
      } = getState();
      const { filename } = images;

      const newPage = { ...page, image: filename };

      const { data } = await axios.post(`${BACKEND_API}/api/pages/`, newPage);

      dispatch({
        type: PAGE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAGE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updatePage =
  (id, page, imagesToUpload, defaultImage) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PAGE_UPDATE_REQUEST,
      });
      if (imagesToUpload.length) {
        await dispatch(uploadImage(imagesToUpload));

        const {
          imageUpload: { images },
        } = getState();
        const { filename } = images;

        page = { ...page, image: filename };
      } else {
        page = { ...page, image: defaultImage[0] };
      }
      console.log(id);
      const { data } = await axios.patch(
        `${BACKEND_API}/api/pages/${id}`,
        page
      );

      dispatch({
        type: PAGE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAGE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
