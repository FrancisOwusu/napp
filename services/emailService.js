"use strict";
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  override: true,
});
const nodemailer = require("nodemailer");
const { mail } = require("../config/app");
const transport = {
  host: mail.MAIL_HOST,
  port: mail.MAIL_PORT,
  secure: mail.MAIL_ENCRYPTION, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: mail.MAIL_USERNAME,
    pass: mail.MAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(transport);
const sendMail = async (to, subject = "Hello ✔") => {
  // send mail with defined transport object
  const mailOptions = {
    from: mail.MAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sendMail,
};
