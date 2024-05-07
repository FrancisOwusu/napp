const baseService = require("./baseService");
const roleRepository = require("../repository/roleRepository");
const { RolePermissionService } = require("../services/");
const { RoleService } = require("../services");
const { RoleRepository } = require("../repository");
module.exports = {
  ...baseService(roleRepository),
  async createRoleWithPermissions(roleName, permissionNames) {
    try {
      
      let roleRecord = null;
      const checkRoleExist = await RoleRepository.findOne({
        where: {
          name: roleName,
        },
      });
      console.log(checkRoleExist.length);
      if (checkRoleExist.length === null) {
        roleRecord = await RoleRepository.save({
          name: roleName,
          user_id: 1,
        });
      } else {
        roleRecord = checkRoleExist;
      }
      
      if (permissionNames && permissionNames.length > 0) {
       await RolePermissionService.addPermissionToRole(
            roleRecord.id,
            permissionNames
          );
      }

      return roleRecord;
    } catch (error) {
      throw new Error(error.stack);
    }
  },
};
