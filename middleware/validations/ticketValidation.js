// middlewares/ticketValidation.js
const { body } = require("express-validator");
const { UserService } = require("../../services");
const ticketValidationRules = () => {
  return [
    body("ticket_number"),
    body("user_id")
      .isNumeric()
      .withMessage("User Id is required")
      .trim()
      .escape(),
    body("details")
      .isLength({ min: 9 })
      .withMessage("Details are required")
      .trim(),
    body("title")
      .isString()
      .withMessage("Title or subject is required"),
  ];
};

module.exports = {
  ticketValidationRules,
};
