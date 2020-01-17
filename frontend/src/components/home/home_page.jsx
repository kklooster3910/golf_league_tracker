import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import NavBar from "../navbar/navbar";
import { logout } from "../../actions/session_actions";

import "./home_page.scss";

const HomePage = ({ username, logUserOut }) => {
  return (
    <div className="home-page-container">
      <NavBar />
      <h1 className="home-header">Chevs League Stat Tracker</h1>
      <footer className="home-footer">
        Copyright &copy; 2020 Kenny Klue Dev Studios
      </footer>
    </div>
  );
};

// const msp = state => ({
//   state
// });

export default connect(
  ({ session }) => ({
    username: session.user.username
  }),
  dispatch => ({
    logUserOut: () => dispatch(logout())
  })
)(HomePage);

// MAKE SURE THAT YOU FINISH WHAT IS HAPPENING IN THE ARTICLE YOU HAVE
// PULLED UP IN
