// services/permissionService.js
'use strict';
const baseRepository = require('./baseRespository')
const models = require('../database/models/index');

module.exports =baseRepository(models.UserPermission) 
