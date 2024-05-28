"use strict";
const baseController = require("./baseController");
const  {RoleService}  = require("../services");
const {UserPermissionService } = require("../services");

module.exports = {
  ...baseController(UserPermissionService),
  async save(req, res) {
    {
      try {
        const { role_id, permissions } = req.body;
        const newRecord = await RolePermissionService.addPermissionToRole(
          role_id,
          permissions
        );
        res
          .status(201)
          .json({ success: true, count: newRecord.length, data: newRecord });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
  async assignUserToPermissions(req, res) {
    {
    
      try {
        const { user_id, permissions } = req.body;
        const newRecord = await UserPermissionService.grantUserPermissions(user_id,permissions).then(record=>{
          return record;
        })
    
        // res.status(201).json(newRecord);
        
       res.status(201).json({ success: true, count: newRecord, data: newRecord});
      } catch (error) {
        res.status(500).json(error.stack);
        res.status(400).json({ message: error.message });
      }
    }
  }
};
