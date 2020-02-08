const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const players = { type: Schema.Types.ObjectId, ref: "user" };

const playerScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "user" },
  score: { type: Number, required: true }
});

const scoresSchema = new Schema({
  hole: { type: Schema.Types.ObjectId, ref: "hole" },
  playerScores: [playerScoreSchema]
});

const RoundSchema = new Schema({
  startTime: { type: Date, required: true },
  startDate: { type: Date, required: true },
  players: [players],
  scores: [scoresSchema]
});

module.exports = Round = mongoose.model("Round", RoundSchema);
