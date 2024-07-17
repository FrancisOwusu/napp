"use strict";

const baseController = require("./baseController");
const { application } = require("../config/app");
const { TicketService, TicketFileService } = require("../services");
const { validationResult, matchedData } = require("express-validator");
const { upload, uploadMiddleware } = require("../middleware/upload");
const ticketFileService = require("../services/ticketFileService");
const path = require("path");
const { where } = require("sequelize");

const models = require("../database/models/index");
module.exports = {
  ...baseController(TicketService),
  findAll: async (req, res) => {
    try {
      const items = await TicketService.findAll({
        // attributes: ['id', 'name', 'CategoryId'], // Ensure these columns exist in your table
        include: [
          {
            model: models.Category,as:'category',// Ensure you have required association defined
            attributes: ["id", "name"], // Include necessary attributes from associated model
          },
          {
            model: models.Priority,as:'priority',// Ensure you have required association defined
            attributes: ["id", "name"], // Include necessary attributes from associated model
          },
          {
            model: models.User,as:'user',// Ensure you have required association defined
            attributes: ["id", "name"], // Include necessary attributes from associated model
          },
        ],
      });

      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.stack });
    }
  },
  save: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let data = matchedData(req); // Get the matched data from the request
    data.ticket_number = Math.floor(Math.random() * 9000000) + 1000000;

    try {
      const newTicket = await module.exports.createTicket(data);
      if (newTicket) {
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
            throw new Error(err.message);
            // return res.status(400).json({ error: err.tr });
          }

          // if (newTicket.id) {
          // ticketFiles = req.file.map((file) => ({
          //   filePath: application.URL + "/" + file.path,
          //   ticket_id: newTicket.id,
          // }));

          let ticketFileObject = {
            filepath: application.URL + "/" + req.file.path,
            ticket_id: newTicket.id,
            filename: req.file.filename,
          };
          // }
          await TicketFileService.save(ticketFileObject);
          console.log(ticketFileObject);
          // const ticketFileRecord = await TicketFileService.bulkCreate(
          //   ticketFiles
          // );
          // let ticketFiles = req.files;
          // const ticketFileRecord=  await TicketFileService.bulkCreate(ticketFiles)
          res.json({
            message: "Ticket and files uploaded successfully",
            ticket: newTicket,
            // ticketFiles: ticketFileRecord,
            // files: req.file,
          });
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    // ************
  },
  createTicket: async (data) => {
    try {
      data.ticket_number = Math.floor(Math.random() * 9000000) + 1000000;
      return await TicketService.save(data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  downloadFile: async (req, res) => {
    try {
      const { id } = req.params;
      const ticketFile = await TicketFileService.findOne({
        where: {
          ticket_id: id,
        },
      });

      if (!ticketFile) {
        return res.status(404).json({ error: "File not found" });
      }

      const directoryPath = __basedir + "/public/uploads/tickets/";
      res.download(
        directoryPath + ticketFile.filename,
        ticketFile.filename,
        (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not download the file. " + err.message,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error downloading file:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
