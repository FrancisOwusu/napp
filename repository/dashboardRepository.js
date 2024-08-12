const baseRepository = require('./baseRespository')
const models = require("../database/models");
module.exports = baseRepository(models.Ticket) 
