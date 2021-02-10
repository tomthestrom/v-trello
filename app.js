const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const path = require("path");

const indexRouter = require("./routes/index");
const boardRouter = require("./routes/board");

const app = express();
app.use(cors());
app.use(express.json());

const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB connection established successfully')
})



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/board/", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
