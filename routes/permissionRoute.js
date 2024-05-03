'use strict'

var express = require('express');
const { PermissionController } = require('../controllers');
let router = express.Router();

router.get('/', PermissionController.findAll);
router.get('/:id', PermissionController.findById);
router.post('/', PermissionController.save);
router.put('/:id',PermissionController.update);
router.delete('/:id', PermissionController.delete);


module.exports = router;
