const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./config/db");
const config = require("./bin/config");
const env = config.env();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const gameInfoRouter = require("./routes/gameInfo");
const addStatsRouter = require("./routes/addStats");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("express-promise")());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/gameInfo", gameInfoRouter);
app.use("/api/v1/addStats", addStatsRouter);

// app.use('/comments', require('./controllers/comments'))
// app.use('/users', require('./controllers/user'))

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log("Unable to connect to MySQL.");
    process.exit(1);
  } else {
    app.listen(env.apiPort, function() {
      console.log(`Listening on port ${env.apiPort}...`);
    });
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
