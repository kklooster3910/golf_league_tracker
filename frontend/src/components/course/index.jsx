import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchCourse } from "../../actions/course_actions";
// import { json } from "body-parser";
// JSON.stringify(courses);
// json and JSON difference? I'm sure I could
// explain it but make sure you that you look it and actually do
// understand it

const Course = ({ fetchCourse, courses = [], location }) => {
  const { pathname } = location;
  const courseId = pathname.split("/");

  useEffect(() => {
    // add some logic for last fetched type of thing? -- probably going to want to have this run on
    // more than just mount
    fetchCourse(courseId[courseId.length - 1]);
  }, []);
  return <div className="course-container">{JSON.stringify(courses)}</div>;
};

export default connect(
  ({ courses }) => ({
    courses
  }),
  { fetchCourse }
)(Course);
