const baseRepository = require('./baseRespository')
const {Priority} = require('../database/models');

module.exports =baseRepository(Priority) 
