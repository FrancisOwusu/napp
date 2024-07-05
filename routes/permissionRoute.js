'use strict'

var express = require('express');
const moduleController = require('../controllers/permissionController');
// const { permissionValidationRules } = require('../middleware/validations/permissionsValidation');
const {PermissionValidataionRules} = require('../middleware/validations')

let router = express.Router();


router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/', PermissionValidataionRules(),moduleController.save);
router.put('/:id',moduleController.update);
router.delete('/:id', moduleController.delete);


module.exports = router;
