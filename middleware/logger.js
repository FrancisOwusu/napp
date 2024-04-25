const { User } = require("../database/models");

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};
module.exports = myLogger;
