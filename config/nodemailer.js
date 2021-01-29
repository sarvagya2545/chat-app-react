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


module.exports.createAndSendMail = ({ to }) => {
  const subject = "Password change link of chat2545.herokuapp.com";
  const url = "https://google.com";
  const html = `
    Here is your password change link: <a href=${url}>Click Here!</a>
    <br/>
    Or copy the following url into your browser: 
    <br/>
    ${url}
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