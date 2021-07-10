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

export const courseListReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, total: 0, courses: [] };
    case COURSE_LIST_SUCCESS:
      return {
        loading: false,
        total: action.payload.total,
        courses: action.payload.data,
      };
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const courseDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true, course: [] };
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
