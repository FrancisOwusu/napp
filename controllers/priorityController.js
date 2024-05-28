'use strict'
const baseController = require("./baseController");
const {PriorityService } = require("../services/");
module.exports = {
  ...baseController(PriorityService)
}