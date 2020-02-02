const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const courses = require("./routes/api/courses");
const bodyparser = require("body-parser");
const passport = require("passport");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoose successfully connected homie..."))
  .catch(e => console.log(e));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app is listening on port:${port}`));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/courses", courses);
