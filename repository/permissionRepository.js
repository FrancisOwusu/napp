const baseRepository = require('./baseRespository')
const models = require('../database/models/index');
const model = models.Permission;

module.exports =baseRepository(model) 
