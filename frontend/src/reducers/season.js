import {
  RECEIVE_SEASON_ERRORS,
  // I should make an errors reducer
  // instead of session errors something
  // more organized maybe it holds all the errors?
  RECEIVE_CURRENT_SEASON
} from "../actions/season";

const initialState = {
  currentSeason: {
    scheduledRounds: [],
    _id: "",
    startDate: "",
    endDate: "",
    name: "",
    players: [],
    rounds: [],
    course: "",
    receivedAt: null
  }
};

export default (state = initialState, { type, currentSeason }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_SEASON:
      return { ...state, currentSeason, receivedAt: Date.now() };
    default:
      return state;
  }
};
