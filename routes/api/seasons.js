const express = require("express");
const router = express.Router();

const Season = require("../../models/Season");
const Player = require("../../models/User");
const Course = require("../../models/Course");
const aSyncMap = require("./mongo_api").aSyncMap;

router.post("/createSeason", async (req, res) => {
  const { startDate, endDate, scheduledRounds, name, rounds } = req.body;
  let { players, course } = req.body;
  try {
    players = await aSyncMap(players, Player.findById, Player);
    course = await Course.findById(course);
  } catch (e) {
    console.error(e);
  }
  const newSeason = {
    startDate,
    endDate,
    scheduledRounds,
    name,
    players,
    rounds,
    course
  };
  new Season(newSeason)
    .save()
    .then(season => res.json(season))
    .catch(err => console.error(err));
});

router.get("/season/:id", async (req, res) => {
  const { id: seasonId } = req.params;
  let season;
  try {
    season = await Season.findById({ _id: seasonId });
    season = await Season.populateSeason(season);
  } catch (e) {
    console.error(e);
  }
  if (season) return res.json(season);
});

module.exports = router;
