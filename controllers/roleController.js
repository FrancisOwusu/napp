"use strict";

const baseController = require("./baseController");
const { RoleService} = require("../services");
const {Role} = require("../database/models/")
const acmodule = require("../utils/acmodule")
module.exports = {
  ...baseController(RoleService),
  async save(req, res) {
    {
      const { name, permissions, user_id } = req.body;
      const newItem=null;
      try {
      console.log(acmodule.getPermissions());
        const role = await RoleService.save({ name: name, user_id: user_id });
        if (role) {
          newItem = await RoleService.createRoleWithPermissions(
            role,
            permissions
          );
        }
        // const newItem = await RoleService.save(req.body);
        res
          .status(201)
          .json({ success: true, count: newItem.length, data: newItem });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
    }
  },
};
