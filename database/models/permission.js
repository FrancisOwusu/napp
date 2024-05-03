'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
    paranoid: true,
    tableName:'permissions',
    createdAt:'created_at',
    updatedAt:'updated_at',
    // If you want to give a custom name to the deletedAt column
    deletedAt: 'deleted_at',
  });
  Permission.associate = models => {
    Permission.belongsToMany(models.Role, { through: 'RolePermission' });
  };
  return Permission;
};