'use strict'
var express = require('express');
const  moduleController  = require('../controllers/userController');
// const {  userValidationRules} = require('../middleware/validations/userValidation');
const {UserValidataionRules} = require('../middleware/validations')


let router = express.Router();

router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/', UserValidataionRules(),moduleController.save);
router.put('/:id', moduleController.update);
router.delete('/:id', moduleController.delete);


module.exports = router;
