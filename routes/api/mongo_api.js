const Course = require("../../models/Course");

/***
 * @param {courseName} string eg: 'chevs.com'
 * @param {errors} object
 * @param {res} serverResponse
 */
const doesCourseExist = async function(courseName, errors, res) {
  const course = await Course.findOne({ courseName });
  if (course) {
    errors.courseExists = "Course Already Exists...";
    return res.status(400).json(errors);
  }
};

/***
 * @param {arrayData} Array eg: req.body.players
 * @param {callBackFunc} function eg: Player.findById or anon - will be called with passed in context
 * @param {context} this this will be the context to call with ig: Player model
 */
const aSyncMap = async function(arrayData, callBackFunc, context) {
  const mappedValues = [];
  for (i = 0; i < arrayData.length; i++) {
    const valToPush = await callBackFunc.call(context, arrayData[i]);
    mappedValues.push(valToPush);
  }
  return mappedValues;
};

module.exports = {
  doesCourseExist,
  aSyncMap
};
