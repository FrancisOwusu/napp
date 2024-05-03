const baseService = require("./baseService");
const roleRepository = require("../repository/roleRepository");
const {Role} = require("../database/models");
const {Permission} = require("../database/models");
const { PermissionService } = require("../services/permissionService");
const { where } = require("sequelize");
module.exports = {
  ...baseService(roleRepository),
  async createRoleWithPermissions(role, permissionNames) {
    try {
      if (permissionNames && permissionNames.length > 0) {
        const permissions = await Permission.findAll({
          where: { name: permissionNames }
        });
        //Permission.findAll({ where: { name: permissionNames } });
        console.log(permissions);
        await Role.addPermissions(permissions);
      }

      return role;
    } catch (error) {
      throw new Error("Error creating role with permissions" + error);
    }
  },
};
