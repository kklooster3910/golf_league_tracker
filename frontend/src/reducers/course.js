import {
  RECEIVE_CURRENT_COURSE,
  RECEIVE_COURSE_ERRORS
  // should probs do something with this
} from "../actions/course";

const initialState = {
  currentCourse: {
    _id: "",
    courseName: "",
    par: "",
    yardage: "",
    frontNine: [],
    backNine: [],
    creationDate: "",
    receivedAt: null
  }
};

export default (state = initialState, { type, currentCourse, errors }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_COURSE:
      return {
        ...state,
        currentCourse,
        receivedAt: Date.now()
      };
    case RECEIVE_COURSE_ERRORS:
      return { ...state, errors };
    default:
      return state;
  }
};
