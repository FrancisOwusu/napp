'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
    user_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true,
    tableName:'categories',
    // If you want to give a custom name to the deletedAt column
    createdAt:'created_at',
    updatedAt:'updated_at',
    // If you want to give a custom name to the deletedAt column
    deletedAt: 'deleted_at',
  });

  Category.associate = models => {
    Category.hasMany(models.Ticket,{foreignKey:'category_id'});
  };
  return Category;
};
