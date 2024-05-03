'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  RolePermission.init({
    role_id: DataTypes.INTEGER,
    permission_id:DataTypes.INTEGER
  }
 , {
  sequelize,
  modelName: 'RolePermission',
  tableName:'role_permission'
    // paranoid: true,
    // // If you want to give a custom name to the deletedAt column
    // deletedAt: 'destroyTime',
  });

  


  return RolePermission;
};
