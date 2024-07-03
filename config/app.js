"use strict";
// require('dotenv').config()
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  override: true,
});
module.exports = {
  baseUrl: "",
  application: {
    ENVIRONMENT: process.env.APP_ENV || "local",
    PORT: process.env.PORT || 4000,
    URL: process.env.APP_URL || "http://localhost:3000",
  },
  environment: {
    development: {
      username: "root",
      password: "",
      database: "napp_db",
      host: "localhost",
      dialect: "mysql",
    },
    test: {
      username: "tuser",
      password: "admin@1",
      database: "napp_db",
      host: "localhost",
      dialect: "mysql",
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
    },
  },
  database: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
  },
  redis: {
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_PORT: process.env.REDIS_PORT || 6379,
  },
  mail: {
    MAIL_DRIVER: process.env.MAIL_DRIVER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
    MAIL_FROM: process.env.MAIL_FROM,
  },
};
