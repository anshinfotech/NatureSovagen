const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendNotification = async (mailMessage) => {
  await transport.sendMail(mailMessage);
};

module.exports = {
  sendNotification,
};
