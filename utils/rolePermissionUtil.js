const RolePermissionUtil = {
  async addPermissionsToRole(roleId, permissions) {
    // Map permission names to their corresponding permission_id
    const permissionIds = await PermissionService.findAll({
      where: {
        name: {
          [Op.in]: permissions
        }
      },
      attributes: ['id']
    }).then(results => {
      return results.map(result => result.id);
    });

    // Check if the association already exists
    const existingAssociations = await RolePermission.findAll({
      where: {
        role_id: roleId,
        permission_id: permissionIds
      }
    });

    // Filter out permissionIds that are already associated with the role
    const permissionsToAdd = permissionIds.filter(permissionId => !existingAssociations.some(association => association.permission_id === permissionId));

    // Create an array of objects to insert into the RolePermission table
    const rolePermissionData = permissionsToAdd.map(permissionId => {
      return { role_id: roleId, permission_id: permissionId };
    });

    // Bulk insert into RolePermission table
    return RolePermission.bulkCreate(rolePermissionData);
  }
};

module.exports = RolePermissionService;