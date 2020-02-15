const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = require("./Course");
const Player = require("./User");
const Round = require("./Round");

const aSyncMap = require("../routes/api/mongo_api").aSyncMap;
const mapCleanKeys = require("./model_api").mapCleanKeys;
const cleanPlayersFunc = require("./model_api").cleanPlayersFunc;

const players = {
  player: { type: Schema.Types.ObjectId, ref: "User" }
};

const rounds = {
  round: { type: Schema.Types.ObjectId, ref: "Round" }
};

const SeasonSchema = new Schema({
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true },
  scheduledRounds: { type: Array, default: [] },
  name: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  rounds: [{ type: Schema.Types.ObjectId, ref: "Round" }],
  course: { type: Schema.Types.ObjectId, ref: "Course" }
});

// DEP
SeasonSchema.statics.populateSeason = async seasonObj => {
  const cleanSeason = await mapCleanKeys(seasonObj, ["players", "course"]);
  const players = await aSyncMap(
    seasonObj.players.map(p => p.id),
    Player.findById,
    Player
  );
  const cleanPlayers = [];
  await cleanPlayersFunc(players, cleanPlayers);
  const course = await Course.findOne({ _id: seasonObj.course.toString() });
  cleanSeason.players = cleanPlayers;
  cleanSeason.course = course;

  return cleanSeason;
};

module.exports = Season = mongoose.model("Season", SeasonSchema);
