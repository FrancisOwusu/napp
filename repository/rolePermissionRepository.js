const baseRepository = require("./baseRespository");
const models = require("../database/models/index");

module.exports = baseRepository(models.RolePermission)