"use strict";
const permission = require('../database/models/permission');
const Permission = require('../services/permissionService')
module.exports= {
    getPermissions : async () => {
        const permissions =  await Permission.findAll()
        return permissions;
    }
}
  
