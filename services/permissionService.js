const baseService= require('./baseService')
const permissionRepository = require('../repository/permissionRepository');
module.exports = baseService(permissionRepository) 