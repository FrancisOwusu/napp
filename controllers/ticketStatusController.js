"use strict";

const baseController = require("./baseController");
const { TicketStatusService } = require("../services");
module.exports = {
  ...baseController(TicketStatusService),
};
