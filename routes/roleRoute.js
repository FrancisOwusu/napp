'use strict'

var express = require('express');
const  RoleController  = require('../controllers/roleController');

const Controller = RoleController;
let router = express.Router();

router.get('/', Controller.findAll);
router.get('/:id', Controller.findById);
router.post('/', Controller.save);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);


module.exports = router;
