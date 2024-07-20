
// const {UserRepository} = require('../repository')
// const {hashPassword,comparePassword} = require("../utils/bcrypt")
const baseService = require('./baseService')
const {UserRepository} = require('../repository');
module.exports = baseService(UserRepository)

