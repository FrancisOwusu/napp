// middleware/accessControl.js
const { RolePermission, RoleUser } = require('../models');

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

module.exports = {
  authorizePermission,
  authorizeRole
};
