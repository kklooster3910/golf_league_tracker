const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = require("./Course");
const Player = require("./User");
const Round = require("./Round");

const aSyncMap = require("../routes/api/mongo_api").aSyncMap;

const players = {
  player: { type: Schema.Types.ObjectId, ref: "user" }
};

const rounds = {
  round: { type: Schema.Types.ObjectId, ref: "round" }
};

const SeasonSchema = new Schema({
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true },
  scheduledRounds: { type: Array, default: [] },
  name: { type: String, required: true },
  players: [players],
  rounds: [rounds],
  course: { type: Schema.Types.ObjectId, ref: "course" }
});

SeasonSchema.statics.populateSeason = async seasonObj => {
  const cleanSeason = {};

  Object.keys(seasonObj._doc)
    .filter(
      courseKey =>
        courseKey != "players" && courseKey != "course" && courseKey != "rounds"
    )
    .forEach(key => (cleanSeason[key] = seasonObj[key]));

  const players = await aSyncMap(
    seasonObj.players.map(p => p.id),
    Player.findById,
    Player
  );

  const course = await Course.findOne({ _id: seasonObj.course.toString() });

  const rounds = await aSyncMap(
    seasonObj.rounds.map(r => r.id),
    Round.findById,
    Round
  );

  cleanSeason.players = players;
  cleanSeason.course = course;
  cleanSeason.rounds = rounds;

  return cleanSeason;
};

module.exports = Season = mongoose.model("Season", SeasonSchema);
