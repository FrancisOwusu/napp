"use strict";

const baseController = require("./baseController");
const {CategoryService } = require("../services");
module.exports = {
  ...baseController(CategoryService),
}
