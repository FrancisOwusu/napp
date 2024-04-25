const baseService= require('./baseService')
const categoryRepository = require('../repository/categoryRepository');
module.exports = baseService(categoryRepository) 
