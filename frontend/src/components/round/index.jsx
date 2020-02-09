import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchRound } from "../../actions/round";
// import { json } from "body-parser";
// JSON.stringify(courses);
// json and JSON difference? I'm sure I could
// explain it but make sure you that you look it and actually do
// understand it

const Round = ({ fetchRound, round = {}, location }) => {
  const { pathname } = location;
  const roundId = pathname.split("/");
  useEffect(() => {
    // add some logic for last fetched type of thing? -- probably going to want to have this run on
    // more than just mount
    fetchRound(roundId[roundId.length - 1]);
  }, []);
  return <div className="round-container">{JSON.stringify(round)}</div>;
};

export default connect(
  ({ round }) => ({
    round
  }),
  { fetchRound }
)(Round);
