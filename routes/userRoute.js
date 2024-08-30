'use strict'
var express = require('express');
const  moduleController  = require('../controllers/userController');
const {  userValidationRules} = require('../middleware/validations/userValidation');
// const {UserValidationRules} = require('../middleware/validations')


let router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/', userValidationRules(),moduleController.save);
router.put('/:id', moduleController.update);
router.delete('/:id', moduleController.delete);


module.exports = router;
