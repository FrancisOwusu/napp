"use strict";

const baseController = require("./baseController");
const { TicketService,TicketFileService} = require("../services");
const {validationResult, matchedData} = require('express-validator');
const {upload,uploadMiddleware} = require('../middleware/upload')
module.exports = {
  ...baseController(TicketService),
  save:async (req, res) => {
    
    try {
       // if (!data.title || !data.description) {
        //     return res.status(400).json({ error: 'Title and description are required' });
        // }
       upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files selected' });
        }


       
        // const newTicket = await TicketService.save(data);
        // const newTicket = await Ticket.create({
        //     title: title,
        //     subject: subject
        // });

        const ticketFiles = req.files.map(file => ({
            filePath: file.path,
            // ticketId: newTicket.id
        }));
        // await TicketFileService.bulkCreate(ticketFiles)

    console.log(ticketFiles)
        res.json({
            message: 'Ticket and files uploaded successfully',
            // ticket: newTicket,
            files: ticketFiles
        });
    });
    } catch (error) {
      new Error(error)
      res.status(400).json({ message: error.message });
    }
    // ************
    // try {



    //   let data = matchedData(req);  // Get the matched data from the request
    //  console.log(data)
     
     
    //   data.ticket_number = Math.floor(Math.random() * 9000000) + 1000000;


     
    //   // Math.floor(Math.random().toString(36).substring(2,6).toUpperCase() * 90000000);
    // //   console.log(data.ticket_number)
    // //  const newItem = await TicketService.save(data);
  
    //   res.status(201).json({ success: true, message: "Ticket Created", data: newItem });
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).json({ message: error.message });
    // }
  }
  


};
