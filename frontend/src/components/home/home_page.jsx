import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./home_page.scss";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="home-header">Chevs League Stat Tracker</h1>
      <div className="home-page-main">
        <Link to="/season/5e45f51984d5763bec60ea41">Go to testing season</Link>
      </div>
      <footer className="home-footer">
        Copyright &copy; 2020 Kenny Klue Dev Studios
      </footer>
    </div>
  );
};

export default connect(
  ({ session }) => ({
    username: session.user.username
  }),
  null
)(HomePage);
