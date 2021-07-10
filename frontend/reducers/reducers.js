import { combineReducers } from "redux";

import {
  userAddCourseReducer,
  userCoursesReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
} from "./userReducers";

import {
  courseListReducer,
  courseDetailReducer,
  courseDeleteReducer,
  courseCreateReducer,
  courseUpdateReducer,
} from "./courseReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./categoryReducers";
import {
  instructorCreateReducer,
  instructorDeleteReducer,
  instructorDetailReducer,
  instructorListReducer,
  instructorUpdateReducer,
} from "./instructorReducers";
import {
  pageCreateReducer,
  pageDeleteReducer,
  pageDetailReducer,
  pageListReducer,
  pageUpdateReducer,
} from "./pageReducers";
import { imagesUploadReducer } from "./imageReducers";
import {
  commentCreateReducer,
  commentDeleteReducer,
  commentDetailReducer,
  commentListReducer,
  commentUpdateReducer,
} from "./commentReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userCourses: userCoursesReducer,
  userList: userListReducer,
  userAddCourse: userAddCourseReducer,

  courseDetails: courseDetailReducer,
  courseList: courseListReducer,
  courseDelete: courseDeleteReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,

  commentDetail: commentDetailReducer,
  commentList: commentListReducer,
  commentDelete: commentDeleteReducer,
  commentCreate: commentCreateReducer,
  commentUpdate: commentUpdateReducer,

  pageCreate: pageCreateReducer,
  pageDetails: pageDetailReducer,
  pageList: pageListReducer,
  pageDelete: pageDeleteReducer,
  pageUpdate: pageUpdateReducer,

  imageUpload: imagesUploadReducer,

  categoryList: categoryListReducer,
  categoryDetail: categoryDetailReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,

  instructorList: instructorListReducer,
  instructorDetail: instructorDetailReducer,
  instructorCreate: instructorCreateReducer,
  instructorDelete: instructorDeleteReducer,
  instructorUpdate: instructorUpdateReducer,
});

export default reducer;
