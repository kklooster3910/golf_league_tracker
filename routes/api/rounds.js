const express = require("express");
const router = express.Router();

const Round = require("../../models/Round");
const Season = require("../../models/Season");
const Player = require("../../models/User");

router.post("/newRound", async (req, res) => {
  const { startTime, startDate, course, season, players, scores } = req.body;
  const newRound = {
    startTime,
    startDate,
    scores,
    players,
    course,
    season
  };

  new Round(newRound)
    .save()
    .then(async round => {
      const _season = await Season.findById({ _id: season });
      _season.rounds.push(round);
      _season.save();
      res.json(round);
    })
    .catch(err => console.error(err));
});

router.put("/addScores", async (req, res) => {
  const { scores, round: roundId } = req.body;
  Round.updateOne({ _id: `${roundId}` }, { $addToSet: { scores: [...scores] } })
    .then(round => res.json(round))
    .catch(err => console.error(err));
});

router.get("/round/:id", async (req, res) => {
  const { id: roundId } = req.params;
  let round;
  try {
    round = await Round.findById({ _id: roundId })
      .populate({
        path: "players",
        select: "averages handicap _id username putts"
      })
      .populate({ path: "course" })
      .populate({ path: "season" })
      .lean();
  } catch (e) {
    console.error(e);
  }
  if (round) return res.json(round);
});

module.exports = router;
