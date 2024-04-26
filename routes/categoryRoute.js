'use strict'

var express = require('express');
const  categoryController  = require('../controllers/categoryController');


let router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.post('/', UserController.save);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);


module.exports = router;
