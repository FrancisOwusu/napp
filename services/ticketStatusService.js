"use strict"
const baseService= require('./baseService')
const ticketStatusRepository = require('../repository/ticketStatusRepository');
module.exports = baseService(ticketStatusRepository) 

