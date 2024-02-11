// emailConfig.js

const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jithu.cbit@gmail.com',
    pass: 'lxzzvwymmlxhzric',
  },
});

module.exports = transporter;
