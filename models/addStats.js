const moment = require("moment");
const db = require("../config/db.js");

exports.create = function(userId, account, done) {
  return new Promise((resolve, reject) => {
    const unixTimestamp = moment().unix();
    const values = [userId, account, unixTimestamp];
    db
      .get()
      .query(
        "INSERT INTO add_stats (userId, account, timestamp) VALUES(?, ?, ?)",
        values,
        function(err, result) {
          if (err) return reject(err);
          resolve(userId);
        }
      );
  });
};

exports.getAll = function(done) {
  return new Promise((resolve, reject) => {
    db.get().query("SELECT * FROM add_stats", function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getAllByUser = function(userId, done) {
  return new Promise((resolve, reject) => {
    db
      .get()
      .query("SELECT * FROM add_stats WHERE userId = ?", userId, function(
        err,
        rows
      ) {
        if (err) return reject(err);
        resolve(rows);
      });
  });
};