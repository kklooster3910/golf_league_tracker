const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");

const validText = require("../../validation/valid_text");
const doesCourseExist = require("./mongo_api");
const mapFrontBacks = require("./mongo_api");

router.post("/addCourse", (req, res) => {
  const { courseName, par, yardage, frontNine, backNine } = req.body;
  const errors = {};
  errors.isValidCourse = validText(courseName);
  doesCourseExist(courseName, errors, res);
  new Course({
    courseName,
    par,
    yardage,
    frontNine: mapFrontBacks(frontNine),
    backNine: mapFrontBacks(backNine)
  })
    .save()
    .then(course => {
      res.json(course);
    })
    .catch(err => console.log(err));
});

router.get("/course/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findOne({ _id: courseId })
    .then(course => {
      res.json(course);
    })
    .catch(err => console.log(err));
});

module.exports = router;
