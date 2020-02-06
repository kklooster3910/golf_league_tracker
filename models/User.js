const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// things to add to a user?
// putts
// handicap?
// averages?
// should their season points and scores live on a seasons object?
// ig: const seasons = {
//rounds: 7 -- 7 week long season
//scheduledRounds: [ 7/19 2019, date of round scheduled out --- this might get built on front end? not sure ]
//year: 2019
//name: 'chevs.com tour'
//players: [objectId:'userId']
//course: 'Field Stone'
//size: numOfPlayers??
// }

const puttsSchema = new Schema({
  season: { type: Schema.Types.ObjectId, ref: "season" },
  round: { type: Schema.Types.ObjectId, ref: "round" },
  hole: { type: Schema.Types.ObjectId, ref: "putt" },
  putts: { type: Number, required: true }
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  putts: [puttsSchema],
  handicap: { type: Number, required: true, default: 0 },
  averages = { type: Array, default: []},
  
});

module.exports = User = mongoose.model("User", UserSchema);
