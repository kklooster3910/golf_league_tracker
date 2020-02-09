import axios from "axios";

export const roundInfo = roundId => axios.get(`api/rounds/round/${roundId}`);
