'use strict'

var express = require('express');
const moduleController = require('../controllers/permissionController');
const  {permissionValidationRules}  = require('../middleware/validations/permissionValidation');
// const {PermissionsValidataionRules} = require('../middleware/validations/permissionsValidation')

let router = express.Router();


router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/', permissionValidationRules(),moduleController.save);
router.put('/:id',moduleController.update);
router.delete('/:id', moduleController.delete);


module.exports = router;
