'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TicketStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TicketStatus',
  
    tableName: "ticket_statuses",
  });
  TicketStatus.associate = models => {
    TicketStatus.hasMany(models.Ticket,{foreignKey:'status_id'});
  };

  return TicketStatus;
};