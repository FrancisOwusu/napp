
// const {UserRepository} = require('../repository')
// const {hashPassword,comparePassword} = require("../utils/bcrypt")
// const baseService = require('./baseService')
// const roleRepository = require('../repository/roleRepository');
module.exports = require('./baseService')(require('../repository/index').UserRepository)
