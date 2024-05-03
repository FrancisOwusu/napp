"use strict";
const { Model } = require("sequelize");
const user = require("./user");
const models = require("./index");
// const models = require('../database/models/index');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    //  */
    // static associate(models) {
    //   // define association here
    // this.hasMany(user)
    // }
  }

  Role.init(
    {
      name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,

        references: {
          // This is a reference to another model
          model: user,

          // This is the column name of the referenced model
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      paranoid: true,
      tableName: "roles",
      // If you want to give a custom name to the deletedAt column
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  // Role.associate = (models) => {
  //   Role.hasMany(models.permission);
  // };

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, { through: "RolePermission" });
    Role.belongsToMany(models.User, { through: "RoleUser" });
  };
  // Custom method to get permissions associated with a role
  Role.prototype.getPermissions = async function() {
    const role = this;
    const permissions = await role.getPermissions(); // Using the association alias to fetch permissions
    return permissions;
  };
  
  Role.prototype.addPermissions = async function(permissions) {
    const currentPermissions = await this.getPermissions(); // Fetching current permissions associated with the role
    const permissionIdsToAdd = permissions.map(permission => permission.id); // Mapping the permissions array correctly
  
    // Filter out permissions that are already associated with this role
    const permissionsToAdd = permissions.filter(permission => !currentPermissions.some(p => p.id === permission.id));
  
    // Associate permissions with this role
    if (permissionsToAdd.length > 0) {
      await this.addPermissions(permissionsToAdd); // Adding permissions to the role
    }
  
    return permissionsToAdd;
  };
  
  return Role;
  
};
