const Course = require("../../models/Course");

module.exports = doesCourseExist = async (courseName, errors, res) => {
  Course.findOne({ courseName }).then(course => {
    if (course) {
      errors.courseExists = "Course Already Exists...";
      return res.status(400).json(errors);
    }
  });
};

module.exports = mapFrontBacks = toBeMapped => {
  return Array.from(toBeMapped)
    .map(ele => +ele)
    .filter(Boolean);
};
