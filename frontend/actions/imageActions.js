import axios from "axios";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from "../constants/imageConstants";
import { BACKEND_API } from "../config";
export const uploadImage = (images) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_UPLOAD_REQUEST,
    });
    const formData = new FormData();
    for (var x = 0; x < images.length; x++) {
      formData.append("file", images[x], images[x].name);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    //
    const { data } = await axios.post(
      `${BACKEND_API}/api/uploadfile`,
      formData,
      config
    );

    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
