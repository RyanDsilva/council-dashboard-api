var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'councilkollab@gmail.com',
    pass: '1234567890ryan'
  }
});

module.exports = transporter;
