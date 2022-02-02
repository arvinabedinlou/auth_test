const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require('axios');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/authDb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
//mongoose.set("useCreateIndex", true);
//mongoose.set("useFindAndModify", false);
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

const login = require("./routes/login");

app.use("/", login);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
app.listen(3000, () => {
  console.log("Express app listening on port 3000");
});
