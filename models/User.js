const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const puttsSchema = new Schema({
  season: { type: Schema.Types.ObjectId, ref: "season" },
  round: { type: Schema.Types.ObjectId, ref: "round" },
  hole: { type: Schema.Types.ObjectId, ref: "hole" },
  putts: Number
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
  averages: { type: Array, default: [] },
  handicap: { type: Number, required: true, default: 0 }
});

module.exports = User = mongoose.model("User", UserSchema);
