const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const frontNineSchema = new Schema({
  par: { type: Number, required: true },
  distances: { type: Array, default: [] },
  handicap: { type: Number, required: true },
  holeNumber: { type: Number, required: true }
});

const backNineSchema = new Schema({
  par: { type: Number, required: true },
  distances: { type: Array, default: [] },
  handicap: { type: Number, required: true },
  holeNumber: { type: Number, required: true }
});

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    unique: true
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
  slope: { type: Array, default: [] },
  frontNine: [frontNineSchema],
  backNine: [backNineSchema],
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("Course", CourseSchema);
