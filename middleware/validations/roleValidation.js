const { body } = require('express-validator');
const {RoleService} = require('../../services');
const { where } = require('sequelize');

const roleValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 3 })
      .withMessage('name must be at least 3 characters long')
      .trim()
      .escape()
      .custom(async name => {
        const obj = await RoleService.findOne({where:{
          name:name
        }});
        if (obj) {
          throw new Error('name already in use');
        }
      })
  ];
};

module.exports = {
  roleValidationRules
};