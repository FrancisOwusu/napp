const baseService= require('./baseService')
const roleRepository = require('../repository/roleRepository');
module.exports = baseService(roleRepository) 
