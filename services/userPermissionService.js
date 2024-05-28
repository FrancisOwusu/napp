"use strict";
const { Op, QueryInterface } = require("sequelize");
const baseService = require("./baseService");
const { Permission, UserPermission } = require("../database/models");
const models = require("../database/models");
const {
  UserPermissionRepository,
  UserRepository,
  Per,
  PermissionRepository,
  RolePermissionRepository,
} = require("../repository");
const { RolePermissionService, PermissionService } = require(".");
const getPermissionByIdsByParam = async (permissions) => {
  try {
    return await PermissionRepository.findAll({
      where: {
        name: {
          [Op.in]: permissions,
        },
      },
    }).then((results) => {
      return results.map((result) => result.id);
    });
  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
  ...baseService(UserPermissionRepository),
  // Define addRole method for User
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
  grantUserPermissions: async function (userId, permissionNames) {
    try {
      const user = await UserRepository.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      const permissionIds = await getPermissionByIdsByParam(permissionNames);

      if (!permissionIds || permissionIds.length === 0) {
        throw new Error("No permissions found.");
      }
      // Check if the association already exists
      const existingAssociations = await this.getExistingAssocitions(
        user.id,
        permissionIds
      );

      const newRecord = null;
      if (!existingAssociations === undefined && permissionIds) {
        //   let userId = user.id;
        const permissionsWithUser = await this.getUserPermissionData(
          user.id,
          permissionNames
        );

        newRecord = await models.UserPermission.bulkCreate(
          permissionsWithUser,
          {
            fields: ["user_id", "permission_id"],
            exclude: ["userId", "permissionId"],
          }
        );
        return newRecord;
      }

      // Filter out permissionIds that are already associated with the user
      const permissionsToAdd = permissionIds.filter(
        (permissionId) =>
          !existingAssociations.some(
            (association) => association.permission_id === permissionId
          )
      );

      // Create an array of objects to insert into the UserPermission table
      const userPermissionData = permissionsToAdd.map((permissionId) => {
        return {
          user_id: userId,
          permission_id: permissionId,
        };
      });

      if (userPermissionData) {
        newRecord = await models.UserPermission.bulkCreate(userPermissionData, {
          fields: ["user_id", "permission_id"],
          exclude: ["userId", "permissionId"],
        });
      }

      return newRecord;
    } catch (error) {
      new Error(error.stack);
    }
  },
  getExistingAssocitions: async (userId, permissionIds) => {
    try {
      return await UserPermissionRepository.findAll({
        where: {
          user_id: userId,
          permission_id: permissionIds,
        },
        attributes: ["user_id", "permission_id"],
      });
    } catch (error) {
      new Error(error);
    }
  },
  grantPermissions: async (userId, permissionIds) =>{
    try {
      const roleUser = await RoleUserRepositroy.save({
        user_id: user.id,
        role_id: role.id,
      });
      return roleUser;
    } catch (error) {
      console.error("Error adding role to user:", error.stack);
      throw error;
    }
  },
  revokePermissions: async (userId, permissionIds)=>{
    try {
      const user = await UserRepository.findByPk(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      const permissions = await PermissionRepository.findAll({
        where: { id: permissionIds },
      });
      if (!permissions || permissions.length === 0) {
        throw new Error("No permissions found.");
      }

      await user.removePermissions(permissions);
      console.log(`Permissions revoked from user with ID ${userId}.`);
    } catch (error) {
      console.error("Error revoking permissions:", error);
    }
  },
};

/*const User = require('../models/User');
const Permission = require('../models/Permission');

async function grantPermissions(userId, permissionIds) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const permissions = await Permission.findAll({ where: { id: permissionIds } });
        if (!permissions || permissions.length === 0) {
            throw new Error('No permissions found.');
        }

        await user.addPermissions(permissions);
        console.log(`Permissions granted to user with ID ${userId}.`);
    } catch (error) {
        console.error('Error granting permissions:', error);
    }
}

async function revokePermissions(userId, permissionIds) {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const permissions = await Permission.findAll({ where: { id: permissionIds } });
        if (!permissions || permissions.length === 0) {
            throw new Error('No permissions found.');
        }

        await user.removePermissions(permissions);
        console.log(`Permissions revoked from user with ID ${userId}.`);
    } catch (error) {
        console.error('Error revoking permissions:', error);
    }
}

module.exports = {
    grantPermissions,
    revokePermissions
};
*/
