import * as APIUtil from "../util/course_api";

export const RECEIVE_COURSE_ERRORS = "RECEIVE_COURSE_ERRORS";
export const RECEIVE_CURRENT_COURSE = "RECEIVE_CURRENT_COURSE";

export const receiveCurrentCourse = currentCourse => ({
  type: RECEIVE_CURRENT_COURSE,
  currentCourse
});

export const receiveCourseErrors = errors => ({
  type: RECEIVE_CURRENT_COURSE,
  errors
});

export const fetchCourse = courseId => dispatch =>
  APIUtil.courseInfo(courseId).then(res =>
    dispatch(receiveCurrentCourse(res.data), err =>
      dispatch(receiveCourseErrors(err))
    )
  );
