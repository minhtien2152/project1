import axios from "axios";
import { BACKEND_API } from "../config";
import {
  USER_COURSES_FAIL,
  USER_COURSES_REQUEST,
  USER_COURSES_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RELOAD,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    axios.defaults.headers.common["Authentication"] = "Bearer " + data.token;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reload = (info) => async (dispatch) => {
  if (axios.defaults.headers.common["Authorization"] === undefined)
    if (localStorage.getItem("userInfo")) {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

  dispatch({
    type: USER_RELOAD,
    payload: JSON.parse(info),
  });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/signup",
        { name, email, password, passwordConfirm },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      axios.defaults.headers.common["Authentication"] = "Bearer " + data.token;
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/users/${id}`);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserCourses = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_COURSES_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/users/${id}/courses`);

    dispatch({
      type: USER_COURSES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: USER_COURSES_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BACKEND_API}/api/users`);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
