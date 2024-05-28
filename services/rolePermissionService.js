"use strict";
const { Op } = require("sequelize");
const PermissionService = require("../services/permissionService");
const baseService = require("./baseService");
const { RolePermissionRepository } = require("../repository");

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
  getUserPermissionData: async (userId, permissions) => {
    try {
      const permissionIds = await getPermissionByIdsByParam(permissions);
      return await permissionIds.map((permissionId) => {
        return { user_id: userId, permission_id: permissionId };
      });
    } catch (error) {
      new Error(error);
    }
  },
  getExistingAssocitions: async (roleId, permissionIds) => {
    try {
      return await RolePermissionRepository.findAll({
        where: {
          role_id: roleId,
          permission_id: permissionIds,
        },
        attributes: ["role_id", "permission_id"],
      });
    } catch (error) {
      new Error(error);
    }
  },
};

module.exports = RolePermissionService;
