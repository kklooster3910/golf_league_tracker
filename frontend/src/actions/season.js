import * as APIUtil from "../util/season_api";

export const RECEIVE_CURRENT_SEASON = "RECEIVE_CURRENT_SEASON";
export const RECEIVE_SEASON_ERRORS = "RECEIVE_SEASON_ERRORS";

export const receiveCurrentSeason = currentSeason => ({
  type: RECEIVE_CURRENT_SEASON,
  currentSeason
});

export const receiveSeasonErrors = errors => ({
  type: RECEIVE_SEASON_ERRORS,
  errors
});

// try re-writing this in async pattern?
export const fetchSeason = seasonId => dispatch => {
  APIUtil.seasonInfo(seasonId)
    .then(res => dispatch(receiveCurrentSeason(res.data)))
    .catch(err => dispatch(receiveSeasonErrors(err)));
};
