const dashboardService = require('../services/dashboardService')
const models = require('../database/models/index');
const Sequelize=require('sequelize');
const { DashboardService } = require('../services');
// const Ticket = models.
module.exports = {
    index:async(req,res)=>{
  
        try {
            const totalTickets = await models.Ticket.count();
            // Ticket.count(); // Total number of tickets
    
            const assignedTickets = await models.Ticket.count({
              where: {
                assignee_id: { [Sequelize.Op.ne]: null },
              },
            }); // Tickets that are assigned
        
            const unassignedTickets = await models.Ticket.count({
              where: {
                assignee_id: null,
              },
            }); // Tickets that are unassigned
        
            const newTickets = await models.Ticket.count({
              where: {
                status_id: 1,
              },
            }); // Tickets that are new
        
            const inProgressTickets = await models.Ticket.count({
              where: {
                status_id: 3,
              },
            }); // Tickets that are in progress
        
            const completedTickets = await models.Ticket.count({
              where: {
                status_id: 3,
              },
            }); // Tickets that are completed
        
            res.status(200).json({
              totalTickets,
              assignedTickets,
              unassignedTickets,
              newTickets,
              inProgressTickets,
              completedTickets,
            });
          } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).json({ error: 'Internal server error' });
          } 
     
    },
    getTicketStatistics: async (req,res) => {
      try {
        const ticketStats = await DashboardService.getTicketStatistics();
        res.status(200).json(ticketStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
      } 
    }
}