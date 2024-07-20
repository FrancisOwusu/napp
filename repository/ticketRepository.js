const baseRepository = require("./baseRespository");
const models = require("../database/models");
const UserRepository = require("../repository/userRepository");
const TicketRepository = require("../repository/ticketFileRepository");
module.exports = {
  ...baseRepository(models.Ticket),
  // const { Ticket, User } = require('../models');

  assignTicketToUser: async (ticketId, userId) => {
    try {
      // Assign the ticket to the user
     return await models.Ticket.update(
        { assignee_id: userId },
        {
          where: {
            id: ticketId,
          },
        },
      );
      return await models.Ticket.update(ticketId, { assignee_id: userId });

      //   ticket.assignee_id = userId;
      //   return await ticket.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
