"use strict";

const baseController = require("./baseController");
const { UserService, EmailService } = require("../services");
const { hashPassword } = require("../utils/bcrypt");
const { wrap } = require("../utils/response");
const role = require("../database/models/role");
const user = require("../database/models/user");
const {validationResult, matchedData} = require('express-validator')

module.exports = {
  ...baseController(UserService),
  findAll: async (req, res) => {
    try {
      let filter =
        {
          where:{
            first_name:req.first_name?? null
          },
          // order:[role, 'created_created', 'DESC'],
          limit: 10
        } ?? {};

      // Query active users along with associated roles
      const items1 = UserService.findAll({
          // where: {
          //   isActive: true // Assuming isActive is a column in the User model
          // },
          // include: [
          //   {
          //     model: role,
          //     through: { attributes: [] } // To exclude the junction table attributes
          //   }
          // ]
        })
        .then((users) => {
          console.log(users);
        })
        .catch((error) => {
          console.error(error);
        });
      const items = await UserService.findAll(filter,
      {include:role});
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.stack });
    }
  },
  save: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(matchedData(req))
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { password } = req.body;
      let hashPas = await hashPassword(password);
      const userObject = { ...req.body, ...{ password: hashPas } };

      const newItem = await UserService.save(userObject);
      if (newItem.email) {
        EmailService.sendMail(newItem.email, "User Created");
      }
      res
        .status(201)
        .json({ success: true, data: newItem, message: "User Created" });
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
