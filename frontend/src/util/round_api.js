import axios from "axios";

export const roundInfo = roundId => axios.get(`api/rounds/round/${roundId}`);

export const newRound = roundData =>
  axios.post("api/rounds/newRound", roundData);
