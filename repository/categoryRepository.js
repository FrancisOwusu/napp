
const baseRepository = require('./baseRespository')
const models = require('../database/models/index');
const categoryModel = models.Category;

module.exports =baseRepository(categoryModel) 
