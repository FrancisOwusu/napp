const { body } = require('express-validator');
const {PriorityService} = require('../../services');
const { where } = require('sequelize');

const priorityValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 4})
      .withMessage('name must be at least 5 characters long')
      .trim()
      .escape()
      .custom(async name => {
        const obj = await PriorityService.findOne({where:{
          name:name
        }});
        if (obj) {
          throw new Error('name already in use');
        }
      })
  ];
};

module.exports = {
  priorityValidationRules
};