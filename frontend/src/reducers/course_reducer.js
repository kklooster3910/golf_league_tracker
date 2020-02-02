import {
  RECEIVE_CURRENT_COURSE,
  RECEIVE_COURSE_ERRORS
  // should probs do something with this
} from "../actions/course_actions";

const initialState = {
  currentCourse: {
    courseName: "",
    par: "",
    yardage: "",
    frontNine: [],
    backNine: [],
    creationDate: ""
  }
};

export default (state = initialState, { type, currentCourse }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_COURSE:
      return {
        ...state,
        currentCourse
      };
    default:
      return state;
  }
};
