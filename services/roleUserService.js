"use strict";
const { Op } = require("sequelize");
const PermissionService = require("../services/permissionService");
const models = require("../database/models");
const baseService = require("./baseService");
const { RoleUserRepositroy } = require("../repository");
module.exports = {
  ...baseService(RoleUserRepositroy),
  // Define addRole method for User
  save: async function (user, role) {
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
};
