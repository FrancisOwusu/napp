const baseService= require('./baseService')
const priorityRepository = require('../repository/priorityRepository');
module.exports = baseService(priorityRepository) 
