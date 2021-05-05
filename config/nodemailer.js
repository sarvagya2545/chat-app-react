const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

const BASE_URL = process.env.NODE_ENV === 'production' ? `https://chat2545.herokuapp.com` : 'http://localhost:3000';

module.exports.createAndSendMail = ({ to, token, userId }) => {
  const subject = "Password change link of chat2545.herokuapp.com";
  const url = `${BASE_URL}/password_change/${userId}?token=${token}`;
  const html = `
    Here is your password change link: <a href=${url}>Click Here!</a>
    <br/>
  `;

  let mailOptions = {
    from: `"Sarvagya Sharma" <${process.env.EMAIL}>`,
    to,
    subject,
    html
  }
  
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      throw err;
    }
  
    console.log('Message sent: ', info.messageId);
  })
}