import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, { type, currentUser }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: {}
      };
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!currentUser,
        user: currentUser
      };
    default:
      return state;
  }
};

//adding a comment for GIT ssh  prurpose --- hopefully I don't have to login every time I
// make a push now
