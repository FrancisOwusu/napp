// middlewares/ticketValidation.js
const { body, check } = require("express-validator");
const validate = require("../validator");
// const { UserService } = require("../../services");
const ticketValidationRules = () => {
  return validate([
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    // body("ticket_number").notEmpty().withMessage("Ticket number is required"),
    body("user_id").notEmpty().withMessage("User ID is required"),
    body("category_id").notEmpty().withMessage("Category ID is required"),
    body("priority_id").notEmpty().withMessage("Priority ID is required"),
  ]);
};

module.exports = ticketValidationRules;
