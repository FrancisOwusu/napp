"use strict";

const baseController = require("./baseController");
const { UserService, EmailService } = require("../services");
const { hashPassword } = require("../utils/bcrypt");
const { wrap } = require("../utils/response");

module.exports = {
  ...baseController(UserService),
  save: async (req, res) => {
    try {
      const { password } = req.body;
      let hashPas = await hashPassword(password);
      const userObject = { ...req.body, ...{ password: hashPas } };
      
      const newItem = await UserService.save(userObject);
      if (newItem.email) {
        EmailService.sendMail(newItem.email, "User Created");
      }
      res.status(201).json(
        {success:true,data:newItem,message:"User Created"});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.registerUser(username, email, password);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
