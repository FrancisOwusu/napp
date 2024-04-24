const baseRepository = require('./baseRespository')
const models = require('../database/models/index');
const roleModel = models.Role;

module.exports =baseRepository(roleModel) 


// module.exports = require('./baseRepository')(require('../database/models/index').Role);
