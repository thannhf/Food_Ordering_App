import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter