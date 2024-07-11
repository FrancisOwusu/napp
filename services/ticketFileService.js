const baseService= require('./baseService')
const {TicketFileRepository} = require('../repository/');
module.exports = baseService(TicketFileRepository) 

