const fs = require("fs");

const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
let sequelize;
let db = {};
// const {db,sequelize,config} =require('../models/index')
const { environment, application } = require("./app");
if (application.ENVIRONMENT == "local") {
  sequelize = new Sequelize(
    environment.development.database,
    environment.development.username,
    environment.development.password,
    environment.development
  );
} else {
  sequelize = new Sequelize(
    environment.production.database,
    environment.production.username,
    environment.production.password,
    environment.production
  );
}
db.sequelize = sequelize;

module.exports = db;

