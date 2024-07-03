// middlewares/userValidation.js
const { body } = require('express-validator');
const {UserService} = require('../../services')
const userValidationRules = () => {
  return [
    body('first_name')
      .isLength({ min: 4 })
      .withMessage('Firstname must be at least 4 characters long')
      .trim()
      .escape(),
      body('user_id')
      .isNumeric()
      .withMessage("User Id is required")
    .trim()
    .escape(),
    body('email')
      .isEmail()
      .withMessage('Email is not valid')
      .normalizeEmail()
      .custom(async(email)=>{
        const user = await UserService.findOne({
            where:{
                email:email
            }
        });
        if(user){
            throw new Error("User already exist,check your email");
        }
      }),
    body('password')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      })
  ];
};

module.exports = {
  userValidationRules
};
