import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
export const sendMail = async ({ to, subject, html }) => {
  await mailTransporter.sendMail({
    from: `"RentEase" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
