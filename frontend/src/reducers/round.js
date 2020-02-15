import {
  RECEIVE_ROUND_ERRORS,
  // I should make an errors reducer
  // instead of session errors something
  // more organized maybe it holds all the errors?
  RECEIVE_CURRENT_ROUND
} from "../actions/round";

// LEFT OFF HERE -- HAVEN"T DONE ANY OF THIS YET

const initialState = {
  currentRound: {
    _id: "",
    startTime: "",
    startDate: "",
    scores: [],
    players: [],
    receivedAt: null
  }
};

export default (state = initialState, { type, currentRound }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_ROUND:
      return { ...state, currentRound, receivedAt: Date.now() };
    default:
      return state;
  }
};
