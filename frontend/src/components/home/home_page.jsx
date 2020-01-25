import React from "react";
import { connect } from "react-redux";

import "./home_page.scss";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="home-header">Chevs League Stat Tracker</h1>
      <div className="home-page-main"></div>
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
