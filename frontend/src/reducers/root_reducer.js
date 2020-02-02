import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import courses from "./course_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  courses
});

export default RootReducer;
