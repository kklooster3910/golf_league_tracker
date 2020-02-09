const express = require("express");
const router = express.Router();

const Round = require("../../models/Round");
const Player = require("../../models/User");
const aSyncMap = require("./mongo_api").aSyncMap;

router.post("/newRound", async (req, res) => {
  const { startTime, startDate } = req.body;
  let { players, scores } = req.body;
  try {
    players = await aSyncMap(players, Player.findById, Player);
  } catch (e) {
    console.error(e);
  }
  const newRound = {
    startTime,
    startDate,
    scores,
    players
  };
  new Round(newRound)
    .save()
    .then(round => res.json(round))
    .catch(err => console.error(err));
});

router.get("/round/:id", async (req, res) => {
  const { id: roundId } = req.params;
  let round;
  try {
    round = await Round.findById({ _id: roundId });
    round = await Round.populatePlayers(round);
  } catch (e) {
    console.error(e);
  }
  if (round) return res.json(round);
});

module.exports = router;
