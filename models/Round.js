const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Player = require("./User");
const mapCleanKeys = require("./model_api").mapCleanKeys;
const cleanPlayersFunc = require("./model_api").cleanPlayersFunc;
const aSyncMap = require("../routes/api/mongo_api").aSyncMap;

const players = {
  player: { type: Schema.Types.ObjectId, ref: "User" }
};

const playerScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "User" },
  score: { type: Number, required: true }
});

// how am I mapping the correct hole id to this hole from the course?
// make sure you double check your add scores ep and make a add score
// a round should be setup to have two opponents

const scoresSchema = new Schema({
  hole: { type: Schema.Types.ObjectId, ref: "hole" },
  playerScores: [playerScoreSchema]
});

const RoundSchema = new Schema({
  startTime: { type: Date, required: true },
  startDate: { type: Date, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  scores: [scoresSchema],
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  season: { type: Schema.Types.ObjectId, ref: "Season" }
});

//DEP
RoundSchema.statics.populatePlayers = async roundObj => {
  const cleanRound = await mapCleanKeys(roundObj, ["players"]);
  const players = await aSyncMap(
    roundObj.players.map(p => p.id),
    Player.findById,
    Player
  );
  const cleanPlayers = [];
  await cleanPlayersFunc(players, cleanPlayers);

  cleanRound.players = cleanPlayers;

  return cleanRound;
};

module.exports = Round = mongoose.model("Round", RoundSchema);
