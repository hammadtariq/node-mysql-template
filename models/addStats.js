const db = require("../config/db.js");

exports.create = function(userId, gameId, account, action) {
  return new Promise((resolve, reject) => {
    const values = [userId, account, gameId, action];
    db
      .get()
      .query(
        "INSERT INTO add_stats (userId, account, gameId, action) VALUES(?, ?, ?, ?)",
        values,
        function(err, result) {
          if (err) return reject(err);
          resolve(result);
        }
      );
  });
};

exports.updateAddById = function(action, userId, gameId) {
  return new Promise((resolve, reject) => {
    db
      .get()
      .query(
        `UPDATE add_stats SET action = '${action}' WHERE gameId = '${gameId}'`,
        function(err, result) {
          if (err) return reject(err);
          resolve(result);
        }
      );
  });
};

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    db.get().query("SELECT * FROM add_stats", function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getAllByUser = function(userId) {
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
