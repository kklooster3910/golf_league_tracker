import * as APIUtil from "../util/round_api";

export const RECEIVE_CURRENT_ROUND = "RECEIVE_CURRENT_ROUND";
export const RECEIVE_ROUND_ERRORS = "RECEIVE_ROUND_ERRORS";

export const receiveCurrentRound = currentRound => ({
  type: RECEIVE_CURRENT_ROUND,
  currentRound
});

export const receiveRoundErrors = errors => ({
  type: RECEIVE_ROUND_ERRORS,
  errors
});

// try re-writing this in async pattern?
export const fetchRound = RoundId => dispatch => {
  APIUtil.roundInfo(RoundId)
    .then(res => dispatch(receiveCurrentRound(res.data)))
    .catch(err => dispatch(receiveRoundErrors(err)));
};
