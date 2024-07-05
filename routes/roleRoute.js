'use strict'

var express = require('express');
const  moduleController  = require('../controllers/roleController');
const {roleValidationRules}  = require('../middleware/validations/roleValidation')

let router = express.Router();

router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
// router.post('/', moduleController.save);
router.post('/', moduleController.createRoleWithPermissions);
router.put('/:id', moduleController.update);
router.delete('/:id', moduleController.delete);


module.exports = router;
