"use strict";

const baseController = require("./baseController");
const {TicketService } = require("../services");
const {validationResult, matchedData} = require('express-validator')
module.exports = {
  ...baseController(TicketService),
  save: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(matchedData(req))
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const { password } = req.body;
      // let hashPas = await hashPassword(password);
      const userObject = { ...req.body
      };

      const newItem = await TicketService.save(userObject);
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
}