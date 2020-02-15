import axios from "axios";

export const seasonInfo = seasonId =>
  axios.get(`api/seasons/season/${seasonId}`);

export const createSeason = seasonData =>
  axios.post(`api/season/createSeason`, seasonData);

export const getAllSeasons = () => axios.get(`api/seasons/listAllSeasons`);
