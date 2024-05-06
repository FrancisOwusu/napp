const { Op } = require("sequelize");
const PermissionService = require("../services/permissionService");

module.exports = {
  async getPermissions(filter) {
    const permissions = await PermissionService.findAll(filter);
    return permissions;
  },

  async getPermissionByNames() {
    const results = await PermissionService.findAll({
      attributes: ["name"],
    });
    return results.map((result) => result.name);
  },

  async getPermissionByIds() {
    const results = await PermissionService.findAll({
      attributes: ["id", "name"],
    });
    return results.map((result) => result.id);
  },

  async getPermissionByIdsByParam(permissions) {
    const results = await PermissionService.findAll({
      where: {
        name: {
          [Op.in]: permissions,
        },
      },
    });
    return results.map((result) => result.id);
  },

  async getPemissonData(roleId, permissions) {
    const permissionIds = await this.getPermissionByIdsByParam(permissions);
    return permissionIds.map((permissionId) => {
      return { role_id: roleId, permission_id: permissionId };
    });
  },
};