const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateLoginInput(data) {
  let errors = {};
  let { username, password } = data;
  // MAKE SURE VALIDATIONS WORKS
  username = validText(username) ? username : "";
  // email = validText(email) || "";
  password = validText(password) ? password : "";

  if (Validator.isEmpty(username)) {
    errors.username = "Must Enter a Username";
  }

  if (Validator.isEmpty(password)) {
    errors.passwordEmpty = "Must enter a password";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
