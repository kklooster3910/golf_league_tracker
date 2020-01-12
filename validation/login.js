const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateLoginInput(data) {
  let errors = {};
  // MAKE SURE VALIDATIONS WORKS
  data.username = validText(data.username) ? data.username : "";
  // data.email = validText(data.email) || "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Must Enter a Username";
  }

  if (Validator.isEmpty(data.password)) {
    errors.passwordEmpty = "Must enter a password";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
