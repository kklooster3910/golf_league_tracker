const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let { username, email, password } = data;
  // MAKE SURE VALIDATIONS WORKS
  username = validText(username) ? username : "";
  email = validText(email) ? email : "";
  password = validText(password) ? password : "";
  // debugger;
  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.usernameLength = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(username)) {
    errors.username = "Must Enter a Username";
  }

  if (Validator.isEmpty(email)) {
    errors.emailNull = "Must Enter an Email";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // debugger;
  // figure out why this is always erroring out?
  // if ((!Validator.isLength(password), { min: 6, max: 30 })) {
  //   errors.passwordLength =
  //     "Password length needs to be between 6 and 30 characters";
  // }

  if (Validator.isEmpty(password)) {
    errors.passwordEmpty = "Must enter a password";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
