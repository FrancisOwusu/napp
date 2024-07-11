// middlewares/ticketValidation.js
const { body,check } = require("express-validator");
// const { UserService } = require("../../services");
const ticketValidationRules = () => {
  return [
    check('title').notEmpty(),
    body('description').notEmpty(),
   body('ticket_number').notEmpty(),
   body('user_id').notEmpty(),
    body("category_id").notEmpty()
      .withMessage("Category is required"),
  
    body("priority_id").notEmpty()
      .withMessage("Priorit is required")
  ];
};

module.exports = {
  ticketValidationRules,
};


