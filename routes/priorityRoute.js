"use strict";
var express = require("express");
const moduleController = require("../controllers/priorityController");
const {PriorityValidataionRules} = require('../middleware/validations')

let router = express.Router();

router.get("/", moduleController.findAll);
router.get("/:id", moduleController.findById);
router.post("/", PriorityValidataionRules(),moduleController.save);
router.put("/:id", moduleController.update);
router.delete("/:id", moduleController.delete);
module.exports = router;