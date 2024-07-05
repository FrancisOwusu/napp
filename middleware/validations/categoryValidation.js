const { body } = require('express-validator');
const {CategoryService} = require('../../services');
const { where } = require('sequelize');

const categoryValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 3 })
      .withMessage('name must be at least 3 characters long')
      .trim()
      .escape()
      .custom(async name => {
        const obj = await CategoryService.findOne({where:{
          name:name
        }});
        if (obj) {
          throw new Error('name already in use');
        }
      })
  ];
};

module.exports = {
  categoryValidationRules
};