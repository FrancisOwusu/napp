"use strict";

const baseController = require("./baseController");
const { RoleService} = require("../services");
const {Role} = require("../database/models/")
// const {getPemissonData,getPermissionByIdsByParam} = require("../utils/acmodule")
const {RolePermissionService} = require("../services")
// const {getPemissonData,getPermissionByNames} =require("../utils/permissionUtil")
module.exports = {
  ...baseController(RoleService),
  async save(req, res) {
    {
      // const { name, permissions, user_id } = req.body;
      // const newItem=null;
      try {
        const {user_id,role_id,name,permissions} = req.body;
        // let result = await acmodule.getPermissionByIds();
        // const permIds = await getPermissionByIdsByParam(permissions)
        const permIds = await RolePermissionService.save(role_id,permissions);

    // const rolePerms =     permIds.map(
    //       (permissionId) => {
    //         return { role_id: role_id, permission_id: permissionId };
    //       }
    //     );


        res.status(200).json(permIds)
      // res.status(200).json(result.inludes({name:'pen'}));

      
        // const role = await RoleService.save({ name: name, user_id: user_id });
        // if (role) {
        //   newItem = await RoleService.createRoleWithPermissions(
        //     role,
        //     permissions
        //   );
        // }
        // // const newItem = await RoleService.save(req.body);
        // res
        //   .status(201)
        //   .json({ success: true, count: newItem.length, data: newItem });
      } catch (error) {
        console.log(error.stack);
        res.status(400).json({ message: error.message });
      }
    }
  },
};
