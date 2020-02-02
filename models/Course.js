const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// course = {
//   name: 'Field Stone',
//   par: 72,
//   yardage: 7002,
//   frontNine: { 1: { yds: 436, par: 4, hdcp: 1 } ... }
//   backNine: { 10: { yds: 204, par: 3, hdcp: 12 } ... }
//   creationDate: Date.now
// }

const CourseSchema = new Schema({});

module.exports = Course = mongoose.model("Course", CourseSchema);
