import axios from "axios";

export const setUpCourse = courseData =>
  axios.post("/api/courses/addCourse", courseData);

export const courseInfo = courseId =>
  axios.get(`/api/courses/course/${courseId}`);
