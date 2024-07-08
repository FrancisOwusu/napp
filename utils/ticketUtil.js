const Ticket = require('../database/models/ticket')
module.exports = {
    // Recursive function to generate a unique ticker number
    generateTicketNumber:async()=>{
        const ticketNumber = Math.random().toString(36).substring(2,6).toUpperCase();

        const ticket = Ticket.findOne({
            where:{
                ticketNumber:ticketNumber
            }
        });
        if(ticket){

        }
    }
}
