
const { body } = require('express-validator');
const {PermissionService} = require('../../services');
const { where } = require('sequelize');

const permissionValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 5 })
      .withMessage('name must be at least 5 characters long')
      .trim()
      .escape()
      .custom(async name => {
        const permission = await PermissionService.findOne({where:{
          name:name
        }});
        if (permission) {
          throw new Error('Permission already in use');
        }
      })
  ];
};

module.exports = {
  permissionValidationRules
};
