const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // MAKE SURE VALIDATIONS WORKS
  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  // debugger;
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.usernameLength = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Must Enter a Username";
  }

  if (Validator.isEmpty(data.email)) {
    errors.emailNull = "Must Enter an Email";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // debugger;
  // figure out why this is always erroring out?
  // if ((!Validator.isLength(data.password), { min: 6, max: 30 })) {
  //   errors.passwordLength =
  //     "Password length needs to be between 6 and 30 characters";
  // }

  if (Validator.isEmpty(data.password)) {
    errors.passwordEmpty = "Must enter a password";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
