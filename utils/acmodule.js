"use strict";
const { Op } = require("sequelize");
const Permission = require("../database/models/");
const PermissionService = require("../services/permissionService");
const RolePermissionService={
 getPermissions : async (filter) => {
  const permissions = await PermissionService.findAll(filter);
  return permissions;
},
getPermissionByNames: async () => {
  return await PermissionService.findAll({
    attributes: ["name"],
  }).then((results) => {
    return results.map((result) => result.name);
  });
},

 getPermissionByIds: async () => {
  return await PermissionService.findAll({
    attributes: ["id", "name"],
  }).then((results) => {
    return results.map((result) => result.id);
  });
},
getPermissionByIdsByParam: async (permissions) => {
  return await PermissionService.findAll({
    where: {
      name: {
        [Op.in]: permissions,
      },
    },
  }).then((results) => {
    return results.map((result) => result.id);
  });
},

getPemissonData :async(roleId, permissions) => {
  const permissionIds = await getPermissionByIdsByParam(permissions);
  return await permissionIds.map(
    (permissionId) => {
      return { role_id: roleId, permission_id: permissionId };
    }
  );
}}
module.exports = RolePermissionService
