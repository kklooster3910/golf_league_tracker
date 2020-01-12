const express = require("express");
const router = express.Router();
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//register a user route, signup
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  // debugger;
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // play around in here and figure out what json and JSON difference is
      // debugger -- for testing use
      errors.emailExists = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // debugger;
      // you need to understand what this function is doing wayyyyy better
      // you need to understand JS better
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 9999 },
                (error, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(error => console.log(error));
        });
      });
    }
  });
});

// route to login
router.post("/login", (req, res) => {
  // debugger;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // debugger;

  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }).then(user => {
    if (!user) {
      // Use the validations to send the error
      // get in here and play around
      // play around with bcryp and json parser
      // debugger
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 9999 },
          (error, token) => {
            res.json({ success: true, token: "Bearer " + token });
            if (error) console.log(error);
          }
        );
      } else {
        // And here:
        // get in here and play around
        // debugger
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// If you make a GET request to localhost:5000/api/users/current in Postman without
// sending a token, you should get an 'Unauthorized' error message.
// dig into passport.authenticate a little big
// debugger;
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email
    });
  }
);

module.exports = router;
