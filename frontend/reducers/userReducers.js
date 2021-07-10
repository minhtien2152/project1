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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: true, error: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_RELOAD:
      return { userInfo: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};
export const userCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case USER_COURSES_REQUEST:
      return { loading: true };
    case USER_COURSES_SUCCESS:
      return { loading: false, courses: action.payload };
    case USER_COURSES_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};
