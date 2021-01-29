const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
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

module.exports.createAndSendMail = ({ to, token }) => {
  const subject = "Password change link of chat2545.herokuapp.com";
  const url = `${BASE_URL}/pw_chng?token=${token}`;
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
      // return console.log(err);
    }
  
    console.log('Message sent: ', info.messageId);
  })
}