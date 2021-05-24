import { combineReducers } from "redux";

import {
  userCoursesReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
} from "./userReducers";

import { courseListReducer, courseDetailReducer } from "./courseReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userCourses: userCoursesReducer,
  courseDetails: courseDetailReducer,
  courseList: courseListReducer,
});

export default reducer;
