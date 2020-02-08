import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchSeason } from "../../actions/season";
// import { json } from "body-parser";
// JSON.stringify(courses);
// json and JSON difference? I'm sure I could
// explain it but make sure you that you look it and actually do
// understand it

const Season = ({ fetchSeason, season = {}, location }) => {
  const { pathname } = location;
  const seasonId = pathname.split("/");
  useEffect(() => {
    // add some logic for last fetched type of thing? -- probably going to want to have this run on
    // more than just mount
    fetchSeason(seasonId[seasonId.length - 1]);
  }, []);
  return <div className="season-container">{JSON.stringify(season)}</div>;
};

export default connect(
  ({ season }) => ({
    season
  }),
  { fetchSeason }
)(Season);
