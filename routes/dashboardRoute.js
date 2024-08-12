"use strict";

var express = require("express");
const moduleController = require("../controllers/dashboardController");

let router = express.Router();

router.get("/", moduleController.index);
module.exports = router;
