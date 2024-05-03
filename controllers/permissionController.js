"use strict";

const baseController = require("./baseController");
const { PermissionService} = require("../services");
module.exports = {
  ...baseController(PermissionService),
};
