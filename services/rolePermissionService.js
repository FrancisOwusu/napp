"use strict";
const { Op } = require("sequelize");
const Permission = require("../database/models/");
const { RolePermission } = require("../database/models");
const PermissionService = require("../services/permissionService");
const baseService = require("./baseService");

// const {getPemissonData,getPermissionByIdsByParam} = require("../utils/acmodule")
const getPermissionByIdsByParam = async (permissions) => {
  return await PermissionService.findAll({
    where: {
      name: {
        [Op.in]: permissions,
      },
    },
  }).then((results) => {
    return results.map((result) => result.id);
  });
};

const RolePermissionService = {
  ...baseService(require("../repository/rolePermissionRepository")),
  getPermissions: async (filter) => {
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

  getPemissonData: async (roleId, permissions) => {
    const permissionIds = await getPermissionByIdsByParam(permissions);
    return await permissionIds.map((permissionId) => {
      return { role_id: roleId, permission_id: permissionId };
    });
  },
  addPermissionToRole: async (roleId, permissions) => {
    const permissionIds = await getPermissionByIdsByParam(permissions);
    // Check if the association already exists
    const existingAssociations = await RolePermissionService.findAll({
      where: {
        role_id: roleId,
        permission_id: permissionIds,
      },
      attributes: ["role_id", "permission_id"],
    });

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
    console.log(rolePermissionData);
    return RolePermission.bulkCreate(rolePermissionData, {
      fields: ["role_id", "permission_id"],
      exclude: ["roleId", "permissionId"],
    });
  },
};

module.exports = RolePermissionService;
