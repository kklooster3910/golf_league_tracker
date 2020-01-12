import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import LoginForm from "./login_form";

import { logout } from "../../actions/session_actions";

import "./home_page.scss";

const HomePage = ({ username, logUserOut }) => {
  return (
    <div className="home-page-container">
      <h1 className="home-header">Chevs League Stat Tracker</h1>

      <span>
        Logged in as {username}
        <button onClick={() => logUserOut()}>Logout</button>
      </span>

      <div className="form-container">
        <SignUpForm />
        <LoginForm />
      </div>
      <div className="list-of-users"></div>
      <footer className="home-footer">
        Copyright &copy; 2020 Kenny Klue Dev Studios
      </footer>
    </div>
  );
};

// export default HomePage;
// const msp = state => ({
//   state
// });
export default connect(
  ({ session }) => ({
    // isLoggedIn: session?.isAuthenticated,
    username: session?.user?.username
  }),
  dispatch => ({
    logUserOut: () => dispatch(logout())
  })
)(HomePage);

// MAKE SURE THAT YOU FINISH WHAT IS HAPPENING IN THE ARTICLE YOU HAVE
// PULLED UP IN
