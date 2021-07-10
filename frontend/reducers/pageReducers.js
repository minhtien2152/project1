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

export const pageListReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_LIST_REQUEST:
      return { loading: true, pages: [] };
    case PAGE_LIST_SUCCESS:
      return { loading: false, pages: action.payload };
    case PAGE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const pageDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_DETAILS_REQUEST:
      return { loading: true, page: [] };
    case PAGE_DETAILS_SUCCESS:
      return { loading: false, page: action.payload };
    case PAGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const pageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_CREATE_REQUEST:
      return { loading: true };
    case PAGE_CREATE_SUCCESS:
      return { loading: false, success: true, page: action.payload };
    case PAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pageUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATE_REQUEST:
      return { loading: true };
    case PAGE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PAGE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_DELETE_REQUEST:
      return { loading: true };
    case PAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
