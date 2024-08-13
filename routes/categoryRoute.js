"use strict";

var express = require("express");
const moduleController = require("../controllers/categoryController");
const {
  categoryValidationRules,
} = require("../middleware/validations/categoryValidation");

let router = express.Router();

router.get("/", moduleController.findAll);
router.get("/:id", moduleController.findById);
router.post("/", categoryValidationRules(), moduleController.save);
router.put("/:id", moduleController.update);
router.delete("/:id", moduleController.delete);

module.exports = router;
