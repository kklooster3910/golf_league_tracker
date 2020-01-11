const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoose successfully connected"))
  .catch(e => console.log(e));

app.get("/", (req, res) => res.send("first route -- setting up server"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app is listening on port:${port}`));
