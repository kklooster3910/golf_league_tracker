import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors";

export default combineReducers({
  session: SessionErrorsReducer
});
