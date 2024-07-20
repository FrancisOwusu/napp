'use strict'

var express = require('express');
const  moduleController  = require('../controllers/ticketController');
const ticketValidationRules = require('../middleware/validations/ticketValidation')
const {upload, uploadMiddleware} = require('../middleware/upload')
let router = express.Router();

router.get('/', moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/',upload,ticketValidationRules(),moduleController.save);
router.get('/files/:id/download', moduleController.downloadFile);
router.post('/assign', moduleController.assignTicketToUser);
// router.put('/:id', moduleController.update);
// router.delete('/:id', moduleController.delete);


module.exports = router;
