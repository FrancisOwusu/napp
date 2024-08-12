module.exports = {
    index:async(req,res)=>{
  
        try {
            const totalTickets = await Ticket.count(); // Total number of tickets
    
            const assignedTickets = await Ticket.count({
              where: {
                assignee_id: { [Sequelize.Op.ne]: null },
              },
            }); // Tickets that are assigned
        
            const unassignedTickets = await Ticket.count({
              where: {
                assignee_id: null,
              },
            }); // Tickets that are unassigned
        
            const newTickets = await Ticket.count({
              where: {
                status: 'new',
              },
            }); // Tickets that are new
        
            const inProgressTickets = await Ticket.count({
              where: {
                status: 'in_progress',
              },
            }); // Tickets that are in progress
        
            const completedTickets = await Ticket.count({
              where: {
                status: 'completed',
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
     
    }
}