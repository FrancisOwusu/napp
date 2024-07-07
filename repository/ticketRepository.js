const baseRepository = require('./baseRespository')
const models = require('../database/models/index');
const ticketModel = models.Ticket;

module.exports =baseRepository(ticketModel) 
