// Although there's only one function here so far, let's import the
// whole file since we will be adding more later
import jwt_decode from "jwt-decode";

import * as APIUtil from "../util/session_api";
// import jwt_decode from "jwt-decode";

// This pattern should be familiar to you BUT REVIEW
// SEE IF YOU CAN WRITE A FILTER TYPE REDUCER LIKE HAVE AT WORK

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      // debugger;
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    });

//debugger
// maybe make all of these implicit? clean it up a bit?
export const signup = user => dispatch => {
  return (
    APIUtil.registerUser(user)
      .then(res => {
        const { token } = res.data;
        // get in a debugger here and play around w/ localStorage
        // debugger
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
        // return the user to the front end and merge with slice of state
        // return dispatch(receiveCurrentUser(decoded));
      })
      // don't have a dispatch or anything for errors in redux right now
      .catch(err => {
        dispatch(receiveErrors(err.response.data));
      })
  );
};
