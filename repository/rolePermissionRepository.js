const baseRepository = require("./baseRespository");
const models = require("../database/models/index");
const { PermissionRepository } = require(".");

module.exports = baseRepository(models.RolePermission)