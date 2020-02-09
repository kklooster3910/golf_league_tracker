import { combineReducers } from "redux";
import session from "./session";
import errors from "./errors";
import courses from "./course";
import season from "./season";
import round from "./round";

const RootReducer = combineReducers({
  session,
  errors,
  courses,
  season,
  round
});

export default RootReducer;
