"use strict";
const baseController = require("./baseController");
const { RoleUserService, RolePermissionService, RoleService, UserService } = require("../services");
const { RoleUser } = require("../database/models/");
const { RoleRepository, UserRepository } = require("../repository");
// const roleUserService = require("../services/roleUserService");
module.exports = {
  ...baseController(RoleUserService),
  async findAll(req, res) {
    try {
      const items = await RoleUser.findAll({
        attributes: ["role_id", "user_id"],
      });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async save(req, res) {
    {
      try {
        const { role_id, user_id } = req.body;
        const role =await RoleService.findById(role_id);
      
        const user = await UserService.findById(user_id);
        if(!role && !user){
            res.status(400).json({ success:false,message: "User or role not found." });
        }
        const newRecord = await RoleUserService.save(role,user);
        res.status(201)
        .json({ success: true, count: newRecord.length, data: newRecord });
      } catch (error) {
        res.status(400).json({ message: error.stack });
      }
    }
  },
};
