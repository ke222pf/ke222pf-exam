const nodemailer = require('nodemailer')
const mailPayload = require('../config/MailPayload')
require('dotenv').config()
module.exports = async (mail, msg) => {

    console.log(msg)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "testnodemailerforexam@gmail.com", 
            pass: "aikaikaik"
           }
       })

  // setup email data with unicode symbols
  let mailOptions = {
    from: `testnodemailerforexam@gmail.com`,
    to: mail, 
    subject: "Notification ✔", 
    text: "Hello world?", 
    html: `${mailPayload(msg)}` 
  }

  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

}