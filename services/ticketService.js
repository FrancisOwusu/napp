const baseService = require("./baseService");
const ticketRepository = require("../repository/ticketRepository");
const { TicketRepository } = require("../repository");
module.exports = {
  ...baseService(ticketRepository),
  assignTicketToUser: async (ticketId, userId) => {
    try {
      return await TicketRepository.assignTicketToUser(ticketId, userId);
    } catch (error) {
      throw new Error(error);
    }
  },
};
