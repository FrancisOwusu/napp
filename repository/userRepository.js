const User = require('../database/models/index').User;
const { sequelize } = require("../database/models");
const { QueryTypes } = require("sequelize");
const  baseRepository = require('./baseRespository')
module.exports = baseRepository(User)
