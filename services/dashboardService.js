const baseService = require("./baseService");
const dashboardRepository = require("../repository/dashboardRepository");
module.exports = {
  ...baseService(dashboardRepository),
};