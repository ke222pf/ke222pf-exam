const nodemailer = require("nodemailer")
const mailPayload = require("../config/MailPayload")
module.exports = async (mail, msg) => {
  console.log(msg)

  require("dotenv").config()
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NodeMail,
      pass: process.env.NodeMailer_PASS
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.NodeMail,
    to: mail,
    subject: "Notification ✔",
    text: "Hello world?",
    html: `${mailPayload(msg)}`
  }

  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
