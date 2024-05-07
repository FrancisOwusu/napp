
/*To manage the junction tables role_permissions and role_users using middleware, we can create a middleware function that checks if the current user has the required permissions or roles. Here's an example implementation:

javascript
Copy code
*/
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
/*
In this middleware:

hasPermission: Checks if the user has a specific permission based on their roles.
hasRole: Checks if the user has a specific role.
authorizePermission: Middleware function to authorize access based on permission.
authorizeRole: Middleware function to authorize access based on role.
You can then use these middleware functions in your routes to control access:

javascript
Copy code
*/
// routes/users.js
// const express = require('express');
// const router = express.Router();
// const { authorizePermission, authorizeRole } = require('../middleware/accessControl');

// router.get('/', authorizePermission(permissionId), (req, res) => {
//   // Handle get users request
// });

// router.post('/', authorizeRole(roleId), (req, res) => {
//   // Handle create user request
// });

// module.exports = router;

// routes/users.js
const express = require('express');
const router = express.Router();
const { authorizePermission, authorizeRole } = require('../middleware/accessControl');

router.get('/', authorizePermission('read_users'), (req, res) => {
  // Handle get users request
});

router.post('/', authorizeRole('admin'), (req, res) => {
  // Handle create user request
});

module.exports = router;
