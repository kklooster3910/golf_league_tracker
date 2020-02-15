import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAllSeasons } from "../../actions/season";

import "./home_page.scss";

const HomePage = ({ fetchAllSeasons, seasonsArray = [] }) => {
  useEffect(() => {
    fetchAllSeasons();
  }, []);

  const mapSeasons =
    !!seasonsArray.length &&
    seasonsArray.map(({ name, course, _id }) => (
      <>
        <div className="season-name">Season Name: {name}</div>
        <div className="course-name">Course Name: {course?.courseName}</div>
        {/* <div>{JSON.stringify(course)}</div> */}
        <a href={`http://localhost:3000/#/season/${_id}`}>Go To Season</a>
      </>
    ));

  return (
    <div className="home-page-container">
      <h1 className="home-header">Chevs League Stat Tracker</h1>
      <div className="home-page-main">{mapSeasons}</div>
      <footer className="home-footer">
        Copyright &copy; 2020 Kenny Klue Dev Studios
      </footer>
    </div>
  );
};

export default connect(
  ({ session, season }) => ({
    username: session.user.username,
    seasonsArray: season.seasonsArray
  }),
  { fetchAllSeasons }
)(HomePage);
