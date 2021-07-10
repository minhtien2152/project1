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

export const instructorListReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_LIST_REQUEST:
      return { loading: true, instructors: [] };
    case INSTRUCTOR_LIST_SUCCESS:
      return { loading: false, instructors: action.payload };
    case INSTRUCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const instructorDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_DETAIL_REQUEST:
      return { loading: true, instructor: [] };
    case INSTRUCTOR_DETAIL_SUCCESS:
      return { loading: false, instructor: action.payload };
    case INSTRUCTOR_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const instructorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_CREATE_REQUEST:
      return { loading: true };
    case INSTRUCTOR_CREATE_SUCCESS:
      return { loading: false, success: true, instructor: action.payload };
    case INSTRUCTOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const instructorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_UPDATE_REQUEST:
      return { loading: true };
    case INSTRUCTOR_UPDATE_SUCCESS:
      return { loading: false, success: true, instructor: action.payload };
    case INSTRUCTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const instructorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_DELETE_REQUEST:
      return { loading: true };
    case INSTRUCTOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INSTRUCTOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
