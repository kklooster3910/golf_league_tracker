const express = require("express");
const router = express.Router();

const Season = require("../../models/Season");
const Player = require("../../models/User");
const Course = require("../../models/Course");
const aSyncMap = require("./mongo_api").aSyncMap;

router.post("/createSeason", async (req, res) => {
  const {
    startDate,
    endDate,
    scheduledRounds,
    name,
    rounds,
    players,
    course
  } = req.body;

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
  Season.findOne({ _id: seasonId })
    .populate({
      path: "rounds"
    })
    .populate({ path: "course" })
    .populate({
      path: "players",
      select: "_id averages handicap username putts"
    })
    .lean()
    .then(season => {
      return res.json(season);
    })
    .catch(err => console.error(err));
});

router.get("/listAllSeasons", async (req, res) => {
  let seasonsArray;
  try {
    seasonsArray = await Season.find({})
      .select("name course")
      .populate({ path: "course" });
  } catch (e) {
    console.error(e);
  }
  if (seasonsArray) return res.json(seasonsArray);
});

module.exports = router;
