"use strict"
const baseRepository = require('./baseRespository')
const models = require('../database/models/index');
const ticketStatusModel = models.TicketStatus;

module.exports =baseRepository(ticketStatusModel) 
