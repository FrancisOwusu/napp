"use strict";
const jwt = require("jsonwebtoken");
const {comparePassword} = require("../utils/bcrypt");
const baseController = require("./baseController");
const { UserService } = require("../services");
const path = require('path');
require("dotenv").config();
require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
    override: true,
  });

// const { User } = require("./models"); // Adjust the path to your models

module.exports = {
  ...baseController(UserService),
  login: async (req, res) => {
    console.log("test")
    const { email, password } = req.body;

    const user = await UserService.findOne({ where: { email:email } });
    if (!user) {
        return res.status(401).json({ error: `${email} cannot be found in our system`});
      }
  
    console.log(user);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  },
};
