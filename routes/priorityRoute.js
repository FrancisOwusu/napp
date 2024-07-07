"use strict";
var express = require("express");
const moduleController = require("../controllers/priorityController");
// const {PriorityValidationRules} = require('../middleware/validations/index')

const {priorityValidationRules} = require('../middleware/validations/priorityValidation')

let router = express.Router();

router.get("/", moduleController.findAll);
router.get("/:id", moduleController.findById);
router.post("/", priorityValidationRules(),moduleController.save);
router.put("/:id", moduleController.update);
router.delete("/:id", moduleController.delete);
module.exports = router;