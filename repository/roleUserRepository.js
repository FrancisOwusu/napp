const baseRepository = require('./baseRespository')
const models = require('../database/models/index');

const model = models.RoleUser;

module.exports = baseRepository(model) 
  
