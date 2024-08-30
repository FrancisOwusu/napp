"use strict";

var express = require("express");
const moduleController = require("../controllers/dashboardController");

let router = express.Router();

router.get("/", moduleController.index);
router.get("/stats",moduleController.getTicketStatistics)
module.exports = router;
