const baseService = require("./baseService");
const ticketRepository = require("../repository/ticketRepository");
const { TicketRepository } = require("../repository");
module.exports = {
  ...baseService(ticketRepository),
  assignTicketToUser: async (ticketId, data) => {
    try {
      console.log(data)
      return await TicketRepository.assignTicketToUser(ticketId, data);
    } catch (error) {
      throw new Error(error);
    }
  },
};
