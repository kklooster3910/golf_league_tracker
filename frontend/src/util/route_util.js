import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// withRouter?

// Passed in from parent component or from mapStateToProps
// REVIEW ALL OF THIS -- YOU NEED TO UNDERSTAND THIS BETER
// you should delte it and write it again
// put debuggers everwhere
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  // how is loggedIn working in here? where do we get that from?
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the tweets page if the user is authenticated
        // leave tweets for now and when you actually get login working
        // and figure out more of how the data on a user is going to look
        // you can adjust this
        // MAKE SURE YOU ADJUST THIS
        <Redirect to="/" />
      )
    }
  />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  // FIGURE OUT WHAT ...rest is in here -- understand this whole
  // process better and what's happening
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        // Redirect to the login page if the user is already authenticated
        <Redirect to="/login" />
      )
    }
  />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in

const mstp = state => ({ loggedIn: state.session.isAuthenticated });

export const AuthRoute = connect(mstp)(Auth);
export const ProtectedRoute = connect(mstp)(Protected);
