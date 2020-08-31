const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const resetEmail = url => `
   <div className="email" style="
    border: 4px solid #651fff;
    border-radius: 20px;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    text-align: center;
   ">
    <h2 style="color: #00796b">iClimb Tracker Password Reset</h2>
    <p>Hi there!</p>
    <p>Looks like you forgot your password. No problem.</p>
    <a href="${url}">Click here to reset.</a>
    <p>The url will expire in 1 hour.</p>
    <p>Thanks for using iClimb Tracker! Happy Climbing!</p>
   </div>
`

exports.transport = transport
exports.resetEmail = resetEmail