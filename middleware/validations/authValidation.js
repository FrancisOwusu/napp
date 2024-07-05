const { body } = require('express-validator');
const {UserService} = require('../../services');
const { where } = require('sequelize');

const authValidationRules = () => {
  return [
    body('email')
      .isLength({ min: 3 })
      .withMessage('name must be at least 3 characters long')
      .trim()
      .escape()
      .custom(async name => {
        const obj = await UserService.findOne({where:{
          email:email
        }});
        if (!obj) {
          throw new Error(`${email} provided does not exist in our system`);
        }
      }),
      body('password')
      .withMessage('Password field is required')
      .trim()
      .escape()
  ];
};

module.exports = {
  authValidationRules
};