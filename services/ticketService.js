const baseService= require('./baseService')
const ticketRepository = require('../repository/ticketRepository');
module.exports = baseService(ticketRepository) 

