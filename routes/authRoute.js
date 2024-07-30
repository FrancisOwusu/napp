'use strict'
var express = require('express');
const  moduleController  = require('../controllers/authController');
// const {  userValidationRules} = require('../middleware/validations/userValidation');
// const {UserValidationRules} = require('../middleware/validations')


let router = express.Router();

router.post('/login',moduleController.login);

module.exports = router;
