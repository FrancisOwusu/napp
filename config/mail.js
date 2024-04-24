const nodemailer = require("nodemailer");
const appConfig = require('./app');
const transport = {
  host: appConfig.mail.MAIL_HOST || "mail.preparemedicine.com",
  port: appConfig.mail.MAIL_PORT || 465,
  secure: appConfig.mail.MAIL_ENCRYPTION || true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: appConfig.mail.MAIL_USERNAME || "media@preparemedicine.com",
    pass: appConfig.mail.MAIL_PASSWORD || "TJ$pm?RySIZG",
  },
}
const mailConfig = nodemailer.createTransport();


module.exports = mailConfig