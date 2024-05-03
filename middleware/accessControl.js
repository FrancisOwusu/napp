"use strict";
const {RolePermission,RoleUser,Role,Permission} = require("../database/models/");
const httpAccess = (req, res, next) => {
  console.log(req);
  if(req.method === "GET"){
    console.log("forbidden");
    // return res.status(403).json({
    //   message: "Forbidden"
    // });
  }
  // console.log("Request URL:", req.originalUrl);
  next();
};

const hasPermission = async (userId, permissionId) => {
  try {
    const userRoles = await RoleUser.findAll({ where: { userId } });
    const roleIds = userRoles.map(role => role.roleId);

    const permissions = await RolePermission.findAll({
      where: { roleId: roleIds, permissionId }
    });

    return permissions.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const hasRole = async (userId, roleId) => {
  try {
    const userRoles = await RoleUser.findAll({ where: { userId, roleId } });
    return userRoles.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const authorizePermission = (permissionId) => async (req, res, next) => {
  const userId = req.user.id; // Assuming you have middleware to authenticate and attach user to req.user

  try {
    const hasPermission = await hasPermission(userId, permissionId);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const authorizeRole = (roleId) => async (req, res, next) => {
  const userId = req.user.id; // Assuming you have middleware to authenticate and attach user to req.user

  try {
    const hasRole = await hasRole(userId, roleId);

    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getPermissionIdByName = async (permissionName) => {
  try {
    const permission = await Permission.findOne({ where: { name: permissionName } });
    return permission ? permission.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getRoleIdByName = async (roleName) => {
  try {
    const role = await Role.findOne({ where: { name: roleName } });
    return role ? role.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};


module.exports = {
  httpAccess,
  authorizePermission,
  authorizeRole,
 }
