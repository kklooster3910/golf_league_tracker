import { combineReducers } from "redux";
import session from "./session";
import errors from "./errors";
import courses from "./course";
import season from "./season";

const RootReducer = combineReducers({
  session,
  errors,
  courses,
  season
});

export default RootReducer;
