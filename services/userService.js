
// const {UserRepository} = require('../repository')
// const {hashPassword,comparePassword} = require("../utils/bcrypt")
const baseService = require('./baseService')
const roleRepository = require('../repository/roleRepository');
module.exports = baseService(roleRepository)
require('./baseService')(require('../repository/index').UserRepository)
