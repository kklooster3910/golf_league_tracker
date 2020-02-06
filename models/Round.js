const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoundSchema = new Schema({});

module.exports = Round = mongoose.model("Round", RoundSchema);
