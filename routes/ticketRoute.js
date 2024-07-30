'use strict'

var express = require('express');
const  moduleController  = require('../controllers/ticketController');
const ticketValidationRules = require('../middleware/validations/ticketValidation')
const {upload, uploadMiddleware} = require('../middleware/upload')
let router = express.Router();



const paginateAndSortMiddleware = require('../middleware/paginationAndSorting');
const { cacheMiddleware, setCacheMiddleware } = require('../middleware/cache');


// Get all tickets with pagination, sorting, and filtering
// router.get('/', cacheMiddleware, (req, res, next) => {
//     res.locals.data = tickets;
//     next();
// }, paginateAndSortMiddleware, setCacheMiddleware, (req, res) => {
//     res.json(res.locals.paginatedData);
// });


router.get('/', cacheMiddleware,moduleController.findAll);
router.get('/:id', moduleController.findById);
router.post('/',upload,ticketValidationRules(),moduleController.save);
router.get('/files/:id/download', moduleController.downloadFile);
router.post('/assign', moduleController.assignTicketToUser);
// router.put('/:id', moduleController.update);
// router.delete('/:id', moduleController.delete);


module.exports = router;
