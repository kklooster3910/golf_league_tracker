import {
  RECEIVE_SEASON_ERRORS,
  RECEIVE_ALL_SEASONS,
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
  },
  seasonsArray: []
};

export default (
  state = initialState,
  { type, currentSeason, seasonsArray }
) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_SEASON:
      return { ...state, currentSeason, receivedAt: Date.now() };
    case RECEIVE_ALL_SEASONS:
      return { ...state, seasonsArray, receivedAt: Date.now() };
    default:
      return state;
  }
};
