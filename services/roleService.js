const baseService = require("./baseService");
const roleRepository = require("../repository/roleRepository");
const { RoleRepository } = require("../repository");
const models = require("../database/models");
const { getPermissionByIdsByParam } = require("../utils/acmodule");
const { getExistingAssocitions } = require("./rolePermissionService");

module.exports = {
  ...baseService(roleRepository),
  createRoleWithPermissions: async (roleName, permissionNames) => {
    try {
      let roleRecord = null;
      const existingRole = await RoleRepository.findOne({
        where: { name: roleName },
      });

      if (existingRole) {
        roleRecord = existingRole;
      } else {
        roleRecord = await RoleRepository.save({
          name: roleName,
          user_id: 1,
        });
      }
      const roleId = roleRecord.id;
      if (permissionNames && permissionNames.length > 0) {
        const permissionIds = await getPermissionByIdsByParam(permissionNames);
        // Check if the association already exists
        const existingAssociations = await getExistingAssocitions(
          roleId,
          permissionIds
        );
        // Filter out permissionIds that are already associated with the role
        const permissionsToAdd = permissionIds.filter(
          (permissionId) =>
            !existingAssociations.some(
              (association) => association.permission_id === permissionId
            )
        );
        // Create an array of objects to insert into the RolePermission table
        const rolePermissionData = permissionsToAdd.map((permissionId) => {
          return {
            role_id: roleId,
            permission_id: permissionId,
          };
        });

        models.RolePermission.bulkCreate(rolePermissionData, {
          fields: ["role_id", "permission_id"],
          exclude: ["roleId", "permissionId"],
        });

        return roleRecord;
      }
      return roleRecord;
    } catch (error) {
      throw new Error(error.stack);
    }
  },
};
