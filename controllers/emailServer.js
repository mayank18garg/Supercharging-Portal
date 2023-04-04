const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: true,
  port: 587,
  auth : {
    user : process.env.USER_EMAIL,
    pass : process.env.APP_PASS
  }
});
module.exports = transporter;