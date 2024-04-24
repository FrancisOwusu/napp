'use strict'

var express = require('express');
const  UserController  = require('../controllers/userController');


let router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.post('/', UserController.save);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);


module.exports = router;
