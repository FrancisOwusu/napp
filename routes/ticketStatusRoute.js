'use strict'

var express = require('express');
const  moduleController  = require('../controllers/ticketStatusController');
const ticketValidationRules = require('../middleware/validations/ticketValidation')
let router = express.Router();



router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/',ticketValidationRules(),moduleController.save);
router.put('/:id', moduleController.update);
router.delete('/:id', moduleController.delete);
module.exports = router;