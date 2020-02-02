// passport.js

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

// PUT DEBUGGERS ALL OVER THIS BAD BOY AND UNDERSTAND IT BETTER
// WHAT IS HAPPENING IN THIS FILE?
// why aren't we using User and what is done?

// is this what allows me to have it and exp on currentUser object
// in the reducer under action when receiving a new user while
// signing up

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // return the user to the frontend
            return done(null, user);
          }
          // return false since there is no user
          return done(null, false);
        })
        .catch(error => console.log(error));
    })
  );
};
