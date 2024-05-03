'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    static associate(models) {
      // define association here
    }
  }
  RoleUser.init({
    role_id: DataTypes.INTEGER,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleUser',
    tableName: 'role_user'
    // paranoid: true,
  
  });

  return RoleUser;
};
