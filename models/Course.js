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

// need to do the year of the league...
// you can see last couple of years data
// so you have data to worrk with
// scores and what not ...
// going to have to figure out everything that needs to be added to
// User model Object

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true
    // LOOK THIS UP TOMORROW
    // unique: true
  },
  par: {
    type: Number,
    min: 57,
    max: 85,
    required: true
  },
  yardage: {
    type: Number,
    required: true
  },
  frontNine: [
    {
      type: Number,
      required: true
    }
  ],
  // LOOK UP TOMORROW
  // how to make these Objects so you can make them
  // how you actually wanted to?
  backNine: [
    {
      type: Number,
      required: true
    }
  ],
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("Course", CourseSchema);
