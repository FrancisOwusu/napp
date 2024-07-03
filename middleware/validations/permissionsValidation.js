// userValidation.js
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
    // body('email')
    //   .isEmail()
    //   .withMessage('Email is not valid')
    //   .normalizeEmail(),
    // body('password')
    //   .isLength({ min: 6 })
    //   .withMessage('Password must be at least 6 characters long')
    //   .matches(/\d/)
    //   .withMessage('Password must contain a number')
  ];
};

module.exports = {
  permissionValidationRules
};
