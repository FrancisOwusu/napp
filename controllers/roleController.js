"use strict";
const baseController = require("./baseController");
const  {RoleService}  = require("../services");
const {RolePermissionService } = require("../services");

module.exports = {
  ...baseController(RoleService),
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
  async createRoleWithPermissions(req, res) {
    {
    
      try {
        const { name, permissions } = req.body;
        const newRecord = await RoleService.createRoleWithPermissions(name,permissions).then(record=>{
          return record;
        })
       res.status(201).json({ success: true, count: newRecord.lenth, data: newRecord});
      } catch (error) {
        res.status(500).json(error.stack);
        res.status(400).json({ message: error.message });
      }
    }
  }
};
