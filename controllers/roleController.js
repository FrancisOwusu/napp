"use strict";

const baseController = require("./baseController");
const {RoleService } = require("../services");
module.exports = {
  ...baseController(RoleService)
}