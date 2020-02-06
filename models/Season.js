const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//season object
// season = {
// players: [objectIds of users]
// startDate: date.neow
// endDate: date
// duration: 4week?
//
// }

const SeasonSchema = new Schema({});

module.exports = Season = mongoose.model("Season", SeasonSchema);
