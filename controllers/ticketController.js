"use strict";

const baseController = require("./baseController");
const { TicketService } = require("../services");
const { validationResult, matchedData } = require("express-validator");
module.exports = {
  ...baseController(TicketService),
  save: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(matchedData(req))
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body);
      // console.log("https data" + matchedData(req));
  
      // console.log(userObject);
      const newItem = await TicketService.save(req.body);

      
      // if (newItem.email) {
      //   EmailService.sendMail(newItem.email, "User Created");
      // }
      res
        .status(201)
        .json({ success: true, data: newItem, message: "User Created" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
};
