const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Player = require("./User");
const mapCleanKeys = require("./model_api").mapCleanKeys;
const cleanPlayersFunc = require("./model_api").cleanPlayersFunc;
const aSyncMap = require("../routes/api/mongo_api").aSyncMap;

// const players = {
//   player: { type: Schema.Types.ObjectId, ref: "User" }
// };

const playerScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "User" },
  score: { type: Number, required: true }
});

const scoresSchema = new Schema({
  hole: { type: Schema.Types.ObjectId, ref: "hole" },
  playerScores: [playerScoreSchema]
});

// so you can have a cart riding together be a matchup?
// const matchupsSchema = new Schema({

// })

const RoundSchema = new Schema({
  startTime: { type: Date, required: true },
  startDate: { type: Date, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // matchups: [matchupSchema],
  scores: [scoresSchema],
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  season: { type: Schema.Types.ObjectId, ref: "Season" },
  isFinished: { type: Boolean, default: false }
});

//limit the players arry to fourSome array length?
// const playerLimit = arr => arr.length <= 4;

module.exports = Round = mongoose.model("Round", RoundSchema);
