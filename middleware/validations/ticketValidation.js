// middlewares/ticketValidation.js
const { body } = require("express-validator");
const { UserService } = require("../../services");
const ticketValidationRules = () => {
  return [
    // body("ticket_number"),
    body("user_id")
      .notEmpty()
      // .withMessage("User Id is required")
      .trim()
      .escape(),
    body("details")
    .notEmpty()
      // .withMessage("Details are required")
      .trim(),
    body("title")
      // .isString()
      .notEmpty()
      // .withMessage("Title or subject is required"),
  ];
};

module.exports = {
  ticketValidationRules,
};
