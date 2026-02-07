import {createTransport} from 'nodemailer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset Your Password - AcademiX LMS",
    html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default sendMail;